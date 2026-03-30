import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function SingleBook({ token }) {
  const [book, setBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchSingleBook() {
      try {
        const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`);
        const result = await response.json();

        setBook(result.book || result);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    }
    fetchSingleBook();
  }, [id]);

  async function handleReserve() {
    try {
      const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          bookId: id,
        }),
      });
      
      const result = await response.json();

      if (response.ok) {
        alert("Book reserved successfully!");

        setBook({ ...book, available: false });
      } else {
        alert(result.message || "Could not reserve book.")
      }
    } catch (error) {
      console.error("Error reserving book:", error);
    }
  }

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <div className="single-book-container">
      <img src={book.coverimage} alt={book.title} />
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
      <p>{book.description}</p>
      <p>Status: {book.available ? "Available" : "Checked Out"}</p>

      {token && (
        <button disabled={!book.available} onClick={handleReserve}>
          {book.available ? "Reserve Book" : "Not Available"}
        </button>
      )}

      <Link to="/">Back to Catalog</Link>
    </div>
  );
}