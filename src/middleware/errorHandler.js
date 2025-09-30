/**
 * Centralized error handling middleware
 */

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  res.status(404);
  try {
    res.render('404');
  } catch (_) {
    res.send('404 Not Found');
  }
};

/**
 * Global error handler
 */
export const errorHandler = (err, req, res, _next) => {
  console.error('Error:', err);

  // Handle axios/API errors
  if (err.response) {
    const status = err.response.status || 500;
    const message =
      status === 404
        ? 'The requested resource was not found.'
        : 'An error occurred while fetching data from the API.';

    return res.status(status).render('error', { message });
  }

  // Handle timeout errors
  if (err.code === 'ECONNABORTED') {
    return res.status(504).render('error', { message: 'Request timeout. Please try again.' });
  }

  // Default error
  res.status(500);
  try {
    res.render('error', { message: 'An unexpected error occurred.' });
  } catch (_) {
    res.send('An unexpected error occurred.');
  }
};
