import express from 'express';
import bookController from '../controllers/bookController.js';
import bookService from '../services/bookService.js';

const router = express.Router();

/**
 * Route definitions for book-related endpoints
 */

// Home page - display books from multiple genres
router.get('/', bookController.getHomePage.bind(bookController));

// Search for books
router.get('/search', bookController.searchBooks.bind(bookController));

// Get book details by title
router.get('/book/:title', bookController.getBookByTitle.bind(bookController));

// Favorites page (client-rendered from localStorage)
router.get('/favorites', (req, res) => {
  res.render('favorites');
});

// API: Suggestions (typeahead)
router.get('/api/suggest', async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const list = await bookService.getSuggestions(q, 6);
    res.json({ suggestions: list });
  } catch (err) {
    next(err);
  }
});

export default router;
