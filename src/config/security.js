/**
 * Security configuration for Helmet middleware
 */
export const helmetConfig = {
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      'img-src': [
        "'self'",
        'data:',
        'https://covers.openlibrary.org',
        'https://archive.org',
        'https://*.archive.org',
      ],
      'script-src': ["'self'", 'https://cdn.jsdelivr.net'],
      'script-src-elem': ["'self'", 'https://cdn.jsdelivr.net'],
      'style-src': ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
      'style-src-elem': ["'self'", 'https://cdn.jsdelivr.net', "'unsafe-inline'"],
      'font-src': ["'self'", 'https://cdn.jsdelivr.net', 'data:'],
      'connect-src': ["'self'", 'https://openlibrary.org', 'https://cdn.jsdelivr.net'],
    },
  },
};

/**
 * Rate limiting configuration
 */
export const rateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  max: 120, // Max 120 requests per minute
  message: 'Too many requests from this IP, please try again later.',
};
