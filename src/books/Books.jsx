import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      console.log("FETCHING NOW...");
      try {
        const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books");
        const result = await response.json();
        
        console.log("API Result:", result);

        if (result && result.books) {
          setBooks(result.books);
        } else if (Array.isArray(result)) {
          setBooks(result);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="books-container">
      <h1>Catalog</h1>      
      <div className="search-bar">
        <label>
          Search Books: 
          <input 
            type="text" 
            placeholder="Search by title..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </label>
      </div>

      <div className="book-list">
        {books.length === 0 ? (
          <p>Loading library catalog...</p>
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.coverimage || book.coverImage} alt={book.title} />
              <div className="book-details">
                <h2>{book.title}</h2>
                <h3>{book.author}</h3>
                <Link to={`/books/${book.id}`}>See Details</Link>
              </div>
            </div>
          ))
        ) : (
          <p>No books found matching that search.</p>
        )}
      </div>
    </div>
  );
}