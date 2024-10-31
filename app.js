import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import axios from "axios";


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let rand

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
      return res.send("Please provide a search term.");
    }

    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);  
      const searchedBook = response.data.docs.slice(0,1).map(book => ({
        cover_id: book.cover_i,
        title: book.title,
        authors_name: book.author_name || "Unknown Author",
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
      }))
      // console.log(searchedBook);
      res.render("searched.ejs", {searchedBook});
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("An error occurred while fetching data.");
    }
});


app.get('/', async (req, res) => {
    try {
        const fictionGenre = `https://openlibrary.org/subjects/fiction.json?ebooks=true`;
        const fictionResponse = await axios.get(fictionGenre);
        rand = Math.floor(Math.random() * (fictionResponse.data.works.length - 4));
        const fictionBooks = fictionResponse.data.works.slice(rand, rand + 4).map(book => ({
          cover_id: book.cover_id,
          title: book.title,
          first_publish_year: book.first_publish_year,
          authors_name: book.authors[0]?.name || "Unknown Author"
          
        }));
        
        const psychologyGenre = `https://openlibrary.org/subjects/psychology.json?ebooks=true`;
        const psychologyResponse = await axios.get(psychologyGenre);
        rand = Math.floor(Math.random() * (psychologyResponse.data.works.length - 4));
        const psychologyBooks = psychologyResponse.data.works.slice(rand, rand + 4).map(book => ({
          cover_id: book.cover_id,
          title: book.title,
          first_publish_year: book.first_publish_year,
          authors_name: book.authors[0]?.name || "Unknown Author"
          
        }));
        const historyGenre = `https://openlibrary.org/subjects/Nonfiction.json?ebooks=true`;
        const historyResponse = await axios.get(historyGenre);
        rand = Math.floor(Math.random() * (historyResponse.data.works.length - 4));
        const historyBooks = historyResponse.data.works.slice(rand, rand + 4).map(book => ({
          cover_id: book.cover_id,
          title: book.title,
          first_publish_year: book.first_publish_year,
          authors_name: book.authors[0]?.name || "Unknown Author"
          
        }));
        const religiousGenre = `https://openlibrary.org/subjects/religious.json?ebooks=true`;
        const religiousResponse = await axios.get(religiousGenre);
        rand = Math.floor(Math.random() * (religiousResponse.data.works.length - 4));
        const religiousBooks = religiousResponse.data.works.slice(rand, rand + 4).map(book => ({
          cover_id: book.cover_id,
          title: book.title,
          first_publish_year: book.first_publish_year,
          authors_name: book.authors[0]?.name || "Unknown Author"
          
        }));
        res.render("index", { 
          fictionBooks,
          psychologyBooks,
          religiousBooks,
          historyBooks
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
      }
});

app.get ('/book/:title', async (req, res) => {
  try {
    
    const title = req.params.title;
    const response = await axios.get(`https://openlibrary.org/search.json?q=${title}`);
    const searchedBook = response.data.docs.slice(0,1).map(book => ({
    
      cover_id: book.cover_i,
      title: book.title,
      authors_name: book.author_name || "Unknown Author",
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
  }))
  // console.log(searchedBook);
  res.render("searched.ejs", {searchedBook});
} catch (error) {
  console.error("Error fetching data:", error);
  res.status(500).send("An error occurred while fetching data.");
}
});

 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});