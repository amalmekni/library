import React, { useEffect, useState } from 'react';
import useBooks from '../hooks/useBooks';
import useAuthors from '../hooks/useAuthors'; // Import the useAuthors hook
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Table, Modal, Button, Form } from 'react-bootstrap';

const MySwal = withReactContent(Swal);

const BooksPage = () => {
  const { books, fetchBooks, deleteBook, updateBook, createBook } = useBooks();
  const { authors, fetchAuthors } = useAuthors(); // Use the useAuthors hook
  const [updatedBook, setUpdatedBook] = useState({
    id: null,
    title: '',
    num_pages: '',
    author: '',
    image_url: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
    fetchAuthors(); // Fetch authors when the component mounts
  }, []);

  const confirmDelete = async (bookId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#78c2ad',
      confirmButtonColor: '#ff7851',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(bookId);
          MySwal.fire({
            title: 'Deleted!',
            text: 'The book has been deleted.',
            icon: 'success',
            confirmButtonColor: '#78c2ad',
          });
        } catch (error) {
          console.error('Error deleting book:', error);
          MySwal.fire({
            title: 'Error!',
            text: 'Failed to delete book.',
            icon: 'error',
            confirmButtonColor: '#78c2ad',
          });
        }
      }
    });
  };

  const handleUpdate = async () => {
    try {
      await updateBook(updatedBook.id, updatedBook);
      setUpdatedBook({
        id: null,
        title: '',
        num_pages: '',
        author: '',
        image_url: '',
      }); // Reset updated book state
      setShowModal(false);
      MySwal.fire({
        title: 'Updated!',
        text: 'The book has been updated.',
        icon: 'success',
        confirmButtonColor: '#78c2ad',
      });
    } catch (error) {
      console.error('Error updating book:', error);
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to update book.',
        icon: 'error',
        confirmButtonColor: '#78c2ad',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook({ ...updatedBook, [name]: value });
  };

  const setBookToUpdate = (book) => {
    setUpdatedBook({
      id: book.id,
      title: book.title,
      num_pages: book.num_pages,
      author: book.author,
      image_url: book.image_url,
    });
    setShowModal(true);
  };

  const handleAddBook = () => {
    setShowModal(true);
  };

  const handleCreateBook = async () => {
    try {
      await createBook(updatedBook);
      setUpdatedBook({
        id: null,
        title: '',
        num_pages: '',
        author: '',
        image_url: '',
      }); // Reset updated book state
      setShowModal(false);
      MySwal.fire({
        title: 'Added!',
        text: 'The book has been added.',
        icon: 'success',
        confirmButtonColor: '#78c2ad',
      });
    } catch (error) {
      console.error('Error creating book:', error);
      MySwal.fire('Error', 'Failed to add book.', 'error');
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to add book.',
        icon: 'error',
        confirmButtonColor: '#ff7851',
      });
    }
  };

  function getAuthorFullName(authorId) {
    const author = authors.find((author) => author.id === authorId);
    if (author) {
      return `${author.first_name} ${author.last_name}`;
    }
    return 'Unknown Author';
  }

  return (
    <div>
      <h1>Books</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleAddBook}>
          <FaPlus /> Add Book
        </Button>
      </div>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Title</th>
            <th>Number of Pages</th>
            <th>Author</th>
            <th>Image</th> {/* Add Image column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.num_pages}</td>
              <td>{getAuthorFullName(book.author)}</td>
              <td>
                <img
                  src={book.image_url}
                  alt={book.title}
                  style={{ maxWidth: '100px' }}
                />
              </td>{' '}
              {/* Display image */}
              <td>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => confirmDelete(book.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setBookToUpdate(book)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {updatedBook.id ? 'Update Book' : 'Add Book'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={updatedBook.title}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formNumPages">
              <Form.Label>Number of Pages</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of pages"
                name="num_pages"
                value={updatedBook.num_pages}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                as="select"
                name="author"
                value={updatedBook.author}
                onChange={handleInputChange}
              >
                <option value="">Select author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.first_name} {author.last_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image_url"
                value={updatedBook.image_url}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={updatedBook.id ? handleUpdate : handleCreateBook}
          >
            {updatedBook.id ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BooksPage;
