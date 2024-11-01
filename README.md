# Capstone Project 4: Book Explorer

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
   git clone https://github.com/yourusername/Capstone_project_4.git
2. **Navigate to the Project Directory:**:
   ```bash
   cd Capstone_project_4
3. **Install Dependencies:**:
   ```bash
   npm install
4. **Run the Application:**:
   ```bash
   node app.js
## Usage

Once the server is running, navigate to `http://localhost:3000` in your web browser. From here, you can:

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
├── app.js              # Main application file
├── package.json        # Project metadata and dependencies
├── public/             # Static files (CSS, images)
├── views/              # EJS templates for rendering pages
└── routes/             # Express routes
```
## API Reference

The project uses the [Open Library API](https://openlibrary.org/developers/api) to fetch book information.

Sample API endpoint for searching by title:
