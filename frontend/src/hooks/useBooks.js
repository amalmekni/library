import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/books/';

const useBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const createBook = async (bookData) => {
    try {
      const response = await axios.post(API_URL, bookData);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`${API_URL}${bookId}/`);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const updateBook = async (bookId, bookData) => {
    try {
      const response = await axios.put(`${API_URL}${bookId}/`, bookData);
      const updatedBooks = books.map((book) =>
        book.id === bookId ? response.data : book
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return { books, fetchBooks, createBook, deleteBook, updateBook };
};

export default useBooks;
