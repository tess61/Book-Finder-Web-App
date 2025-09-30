import express from 'express';
import bookController from '../controllers/bookController.js';

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

export default router;
