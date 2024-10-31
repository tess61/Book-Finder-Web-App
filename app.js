import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import axios from "axios";
import { title } from "process";


const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// const URL = "https://openlibrary.org";

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
      
    //   console.log(JSON.stringify(response.data.docs[0].author_name));
    //   console.log(JSON.stringify(response.data.docs[0].first_publish_year));
    //   console.log(JSON.stringify(response.data.docs[0].title));
    //   console.log(JSON.stringify(response.data.docs[0].ratings_average));
  
      res.send("Check console for search results");
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("An error occurred while fetching data.");
    }
});


app.get('/', async (req, res) => {
    // let bookData = "";
    // const generURL = `https://openlibrary.org/subjects/fiction.json?limit=4&ebooks=true`;
    // try {
    //     let response = await axios.get(`${generURL}`);
    //     bookData = {
    //     cover_id : JSON.stringify(response.data.works[0].cover_id),
    //     title: JSON.stringify(response.data.works[0].title),
    //     first_publish_year: JSON.stringify(response.data.works[0].first_publish_year),
    //     authors_name: JSON.stringify(response.data.works[0].authors[0].name),
    // }
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     res.status(500).send("An error occurred while fetching data.");
    //   }
    //   console.log(bookData);
    // const coverURL = `https://covers.openlibrary.org/b/id/${bookData.cover_id}-M.jpg`;
    
    // res.render("index", { 
    //     coverURL: coverURL,
    //     title: bookData.title,
    //     first_publish_year: bookData.first_publish_year,
    //     authors_name: bookData.authors_name
    // });
    try {
        const psychologyGenre = `https://openlibrary.org/subjects/fiction.json?limit=4&ebooks=true`;
        const response = await axios.get(psychologyGenre);
        // Map the first four books into a new array with relevant details
        const books = response.data.works.slice(0, 4).map(book => ({
          cover_id: book.cover_id,
          title: book.title,
          first_publish_year: book.first_publish_year,
          authors_name: book.authors[0]?.name || "Unknown Author"
          
        }));
        // console.log(JSON.stringify(response.data.works[0].cover_id));
        // Send the array to the `index.ejs` view
        res.render("index", { books });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("An error occurred while fetching data.");
      }
});
 
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});