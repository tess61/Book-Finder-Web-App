# Book Finder Web App

A professional, production-ready web application that allows users to explore books across various genres, search by title, and view detailed book information using the [Open Library API](https://openlibrary.org/developers/api).

## Overview

This project is built with a clean **MVC architecture** using Express.js and follows industry best practices for code quality, security, and maintainability. Users can explore books in four main categories:

- **Religious**
- **Psychology**
- **Fiction**
- **Non-Fiction**

Additionally, the application features a powerful search function, comprehensive error handling, rate limiting, and security headers.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Available Scripts](#available-scripts)
- [Project Architecture](#project-architecture)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)

## Features

- 📚 **Book Browsing**: Explore curated selections across four genres with random book recommendations
- 🔍 **Advanced Search**: Find specific books by title with detailed results
- 🎨 **Modern UI**: Clean, responsive design with Bootstrap 5
- 🔒 **Security**: Helmet.js with Content Security Policy, rate limiting, and input validation
- ⚡ **Performance**: Response compression and optimized API calls
- 🛡️ **Error Handling**: Comprehensive error handling with user-friendly messages
- 📝 **Code Quality**: ESLint and Prettier for consistent, maintainable code
- 🏗️ **MVC Architecture**: Clean separation of concerns (routes → controllers → services)
- 📊 **Logging**: Morgan HTTP request logger for development and debugging

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tess61/Book-Finder-Web-App.git
   ```
2. **Navigate to the Project Directory:**:
   ```bash
   cd Book-Finder-Web-App
   ```
3. **Install Dependencies:**:
   ```bash
   npm install
   ```
4. **Copy env file and configure:**
   ```bash
   cp .env.example .env
   # edit .env if you want to change PORT
   ```
5. **Run the Application:**
   ```bash
   npm run start
   ```
   or, for development with auto-reload:
   ```bash
   npm run dev
   ```

## Usage

Once the server is running, navigate to `http://localhost:3000` (or your configured `PORT`) in your web browser.

### Main Features:

1. **Home Page**: Browse random book selections from four genres
2. **Search**: Use the search bar to find specific books by title
3. **Book Details**: Click on any book to view comprehensive information including:
   - Cover image
   - Author(s)
   - Publication year
   - Number of pages
   - Published locations
   - Ratings
   - Available languages

## Available Scripts

```bash
# Start the application in production mode
npm run start

# Start the application in development mode with auto-reload
npm run dev

# Format all code with Prettier
npm run format

# Check code formatting without making changes
npm run format:check

# Lint code with ESLint
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## Project Architecture

This application follows the **MVC (Model-View-Controller)** pattern:

### **Services Layer** (`src/services/`)

- Handles all API interactions with Open Library
- Manages data transformation and business logic
- Provides reusable methods for book operations

### **Controllers Layer** (`src/controllers/`)

- Processes HTTP requests and responses
- Validates user input
- Coordinates between services and views

### **Routes Layer** (`src/routes/`)

- Defines application endpoints
- Maps URLs to controller methods

### **Middleware** (`src/middleware/`)

- Centralized error handling
- Custom error messages for different error types

### **Configuration** (`src/config/`)

- Security settings (Helmet, CSP)
- Rate limiting configuration

## Technologies Used

### Core Technologies

- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, minimalist web framework
- **EJS** - Embedded JavaScript templating engine
- **Axios** - Promise-based HTTP client for API requests

### Security & Performance

- **Helmet** - Security headers middleware
- **express-rate-limit** - Rate limiting to prevent abuse
- **compression** - Response compression for better performance

### Development Tools

- **ESLint** - JavaScript linter for code quality
- **Prettier** - Code formatter for consistent style
- **Nodemon** - Auto-restart during development
- **Morgan** - HTTP request logger

### External API

- **Open Library API** - Public API for accessing comprehensive book data

## Project Structure

```plaintext
Book-Finder-Web-App/
├── src/
│   ├── config/
│   │   └── security.js
│   ├── controllers/
│   │   └── bookController.js
│   ├── services/
│   │   └── bookService.js
│   ├── middleware/
│   │   └── errorHandler.js
│   └── routes/
│       └── bookRoutes.js
├── views/
│   ├── partials/
│   ├── index.ejs
│   ├── searched.ejs
│   ├── 404.ejs
│   └── error.ejs
├── public/
│   ├── css/
│   └── images/
├── app.js                 # Main entry point (46 lines!)
├── package.json
├── .eslintrc.json
├── .prettierrc.json
├── .prettierignore
├── .env.example
├── .gitignore
└── README.md
```

## API Reference

The project uses the [Open Library API](https://openlibrary.org/developers/api) to fetch book information.

### Key Endpoints Used:

**Search Books by Query:**

```
GET https://openlibrary.org/search.json?q={query}
```

**Get Books by Subject:**

```
GET https://openlibrary.org/subjects/{subject}.json?ebooks=true
```

### Example Response Fields:

- `cover_i` / `cover_id` - Book cover identifier
- `title` - Book title
- `author_name` - Author(s)
- `first_publish_year` - Year of first publication
- `number_of_pages_median` - Median page count
- `ratings_average` - Average rating
- `language` - Available languages
- `publish_place` - Publication locations

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and ensure code quality:
   ```bash
   npm run format
   npm run lint:fix
   ```
4. Commit your changes: `git commit -m 'Add some feature'`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a Pull Request

### Code Standards:

- Follow the existing MVC architecture
- Write JSDoc comments for new functions
- Ensure all lint checks pass
- Format code with Prettier before committing

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Open Library](https://openlibrary.org/) for providing the comprehensive book API
- [Bootstrap](https://getbootstrap.com/) for the UI framework
- The open-source community for the amazing tools and libraries
