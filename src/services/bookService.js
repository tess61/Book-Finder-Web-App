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
}

export default new BookService();
