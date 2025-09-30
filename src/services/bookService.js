import axios from 'axios';

/**
 * Service layer for Open Library API interactions
 */
class BookService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://openlibrary.org',
      timeout: 10000,
    });

    // Response interceptor with simple retry for transient errors (e.g., 503)
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error.config || {};
        const status = error.response?.status;
        const isTransient = status === 503 || status === 502 || status === 429 || status === 504;
        const maxRetries = 2;
        if (!config.__retryCount) config.__retryCount = 0;

        if (isTransient && config.__retryCount < maxRetries) {
          config.__retryCount += 1;
          const backoffMs = 300 * Math.pow(2, config.__retryCount - 1); // 300ms, 600ms
          await new Promise((r) => setTimeout(r, backoffMs));
          return this.client(config);
        }
        return Promise.reject(error);
      }
    );

    // Simple in-memory cache with TTL for suggestions
    this.suggestCache = new Map(); // key -> { data, expiresAt }
    this.suggestTtlMs = 60 * 1000; // 60s
  }

  /**
   * Search for books by query
   * @param {string} query - Search term
   * @returns {Promise<Object>} Book data
   */
  async searchBooks(query) {
    const response = await this.client.get('/search.json', {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * Get books by subject/genre
   * @param {string} subject - Subject name
   * @param {boolean} ebooksOnly - Filter for ebooks only
   * @returns {Promise<Object>} Books in that subject
   */
  async getBooksBySubject(subject, ebooksOnly = true) {
    const response = await this.client.get(`/subjects/${subject}.json`, {
      params: { ebooks: ebooksOnly },
    });
    return response.data;
  }

  /**
   * Transform search result to standardized book object
   * @param {Object} book - Raw book data from API
   * @returns {Object} Standardized book object
   */
  transformSearchResult(book) {
    return {
      cover_id: book.cover_i,
      title: book.title,
      authors_name: book.author_name || 'Unknown Author',
      averageRating: book.ratings_average,
      rating_one: book.ratings_count_1,
      rating_two: book.ratings_count_2,
      rating_three: book.ratings_count_3,
      rating_four: book.ratings_count_4,
      rating_five: book.ratings_count_5,
      publish_Place: book.publish_place,
      pages: book.number_of_pages_median,
      language: book.language,
      first_publish_year: book.first_publish_year,
    };
  }

  /**
   * Transform subject/works result to standardized book object
   * @param {Object} book - Raw book data from subject API
   * @returns {Object} Standardized book object
   */
  transformSubjectResult(book) {
    return {
      cover_id: book.cover_id,
      title: book.title,
      first_publish_year: book.first_publish_year,
      authors_name: book.authors?.[0]?.name || 'Unknown Author',
    };
  }

  /**
   * Get random books from multiple subjects
   * @param {Array<string>} subjects - Array of subject names
   * @param {number} count - Number of books per subject
   * @returns {Promise<Object>} Object with books grouped by subject
   */
  async getBooksByMultipleSubjects(subjects, count = 4) {
    const results = {};

    await Promise.all(
      subjects.map(async (subject) => {
        const data = await this.getBooksBySubject(subject);
        const rand = Math.floor(Math.random() * Math.max(0, data.works.length - count));
        results[subject] = data.works
          .slice(rand, rand + count)
          .map((book) => this.transformSubjectResult(book));
      })
    );

    return results;
  }

  /**
   * Get title suggestions for typeahead
   * @param {string} query
   * @param {number} limit
   * @returns {Promise<Array<{title:string, author:string, cover_id?:number}>>}
   */
  async getSuggestions(query, limit = 6) {
    const q = (query || '').trim();
    if (q.length < 2) return [];

    const cacheKey = `${q.toLowerCase()}::${limit}`;
    const cached = this.suggestCache.get(cacheKey);
    const now = Date.now();
    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const response = await this.client.get('/search.json', {
      params: { q, limit },
    });
    const docs = Array.isArray(response.data?.docs) ? response.data.docs : [];
    const suggestions = docs.slice(0, limit).map((d) => ({
      title: d.title,
      author: Array.isArray(d.author_name) ? d.author_name[0] : d.author_name || 'Unknown Author',
      cover_id: d.cover_i,
    }));

    this.suggestCache.set(cacheKey, { data: suggestions, expiresAt: now + this.suggestTtlMs });
    return suggestions;
  }
}

export default new BookService();
