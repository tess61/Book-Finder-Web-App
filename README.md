# Book Finder Web App

In this project, users can explore books of various genres, search by title, and view book details using the  [Open Library API](https://openlibrary.org/developers/api).

## Overview

This project utilizes the Express.js framework and Axios HTTP client to interact with Open Library's public API. Users can explore books by four main categories:

- Religious
- Psychology
- Fiction
- Non-Fiction

Additionally, the application allows users to search for books by title, displaying relevant book covers and details.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Features](#project-features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/tess61/Book-Finder-Web-App.git
2. **Navigate to the Project Directory:**:
   ```bash
   cd Book-Finder-Web-App
3. **Install Dependencies:**:
   ```bash
   npm install
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
## Usage

Once the server is running, navigate to `http://localhost:3000` (or your configured `PORT`) in your web browser. From here, you can:

- Browse books by the four primary genres.
- Use the search function to find specific books by title.
- Click on book covers to view more detailed information.

## Project Features

- **Book Browsing**: Explore a curated selection of books across four genres: religious, psychology, fiction, and non-fiction.
- **Search by Title**: Enter a title in the search bar to find books within the Open Library database.
- **Book Details**: View cover images and detailed information about each book.

## Technologies Used

- **Express.js**: Web framework for building server-side applications.
- **Node.js**: JavaScript runtime environment.
- **Axios**: HTTP client used to make API requests.
- **Open Library API**: Public API for accessing book data.
## Project Structure

```plaintext
Capstone_project_4/
├── app.js                 # Main application file
├── package.json           # Project metadata and dependencies
├── public/
   |__css/
   |__images/               # Static files (CSS, images)
├── views/
   |__partials/
      |__footer.ejs
      |__header.ejs         # EJS templates for rendering pages
   |__index.ejs
   |__searched.ejs        
└── views/404.ejs, views/error.ejs  # Error pages
```
## API Reference

The project uses the [Open Library API](https://openlibrary.org/developers/api) to fetch book information.

Sample API endpoint for searching by title:
