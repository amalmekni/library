import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/authors/';

const useAuthor = () => {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(API_URL);
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const createAuthor = async (authorData) => {
    try {
      const response = await axios.post(API_URL, authorData);
      setAuthors([...authors, response.data]);
    } catch (error) {
      console.error('Error creating author:', error);
    }
  };

  const deleteAuthor = async (authorId) => {
    try {
      await axios.delete(`${API_URL}${authorId}/`);
      setAuthors(authors.filter((author) => author.id !== authorId));
    } catch (error) {
      console.error('Error deleting author:', error);
    }
  };

  const updateAuthor = async (authorId, authorData) => {
    try {
      const response = await axios.put(`${API_URL}${authorId}/`, authorData);
      const updatedAuthors = authors.map((author) =>
        author.id === authorId ? response.data : author
      );
      setAuthors(updatedAuthors);
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  return { authors, fetchAuthors, createAuthor, deleteAuthor, updateAuthor };
};

export default useAuthor;
