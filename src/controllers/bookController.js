import bookService from '../services/bookService.js';

/**
 * Controller for book-related routes
 */
class BookController {
  /**
   * Render home page with books from multiple genres
   */
  async getHomePage(req, res, next) {
    try {
      const subjects = ['fiction', 'psychology', 'Nonfiction', 'religious'];
      const booksBySubject = await bookService.getBooksByMultipleSubjects(subjects, 4);

      res.render('index', {
        fictionBooks: booksBySubject.fiction,
        psychologyBooks: booksBySubject.psychology,
        historyBooks: booksBySubject.Nonfiction,
        religiousBooks: booksBySubject.religious,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Search for books and render results
   */
  async searchBooks(req, res, next) {
    try {
      const query = req.query.q;

      if (!query || query.trim() === '') {
        return res.status(400).render('error', { message: 'Please provide a search term.' });
      }

      const data = await bookService.searchBooks(query);

      if (!data.docs || data.docs.length === 0) {
        return res.render('searched', { searchedBook: [] });
      }

      const searchedBook = data.docs
        .slice(0, 1)
        .map((book) => bookService.transformSearchResult(book));

      res.render('searched', { searchedBook });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get book details by title
   */
  async getBookByTitle(req, res, next) {
    try {
      const { title } = req.params;

      if (!title || title.trim() === '') {
        return res.status(400).render('error', { message: 'Book title is required.' });
      }

      const data = await bookService.searchBooks(title);

      if (!data.docs || data.docs.length === 0) {
        return res.render('searched', { searchedBook: [] });
      }

      const searchedBook = data.docs
        .slice(0, 1)
        .map((book) => bookService.transformSearchResult(book));

      res.render('searched', { searchedBook });
    } catch (error) {
      next(error);
    }
  }
}

export default new BookController();
