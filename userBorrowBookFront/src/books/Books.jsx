import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookService } from "../middleware/bookService";


const Books = () => {
  // Custom hook to access the BookService
  const bookService = useBookService();
  // State to hold the list of books
  const [books, setBooks] = useState([]);
  // useNavigate hook to programmatically navigate
  const navigate = useNavigate();

  // Fetch all books
  // Fetch books from API
  useEffect(() => {
    async function fetchBooks() {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    }

    fetchBooks();
  }, [bookService]);

  // Delete a book by ID
  const deleteBook = async (id) => {
    try {
      await bookService.deleteBook(id);
      setBooks(books.filter((book) => book.id !== id));
      alert("Book deleted successfully");
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("Failed to delete book. An error occurred.");
      }
    }
  };

  // Redirect to update form
  const updateBook = (book) => {
    navigate(`/books/update/${book.id}`, { state: { book } });
  };

  // Redirect to detail component
  const detailBook = (book) => {
    navigate(`/books/detail/${book.id}`, { state: { book } });
  };

  // Navigate to create book form
  const createBook = () => {
    navigate("/books/create");
  };



  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={createBook}
        style={{ marginBottom: "20px" }}
      >
        Create Book
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>ISBN</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.isbn}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => updateBook(book)}>
                    Update
                  </Button>
                  <Button color="secondary" onClick={() => deleteBook(book.id)}>
                    Delete
                  </Button>
                  <Button color="success" onClick={() => detailBook(book)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Books;
