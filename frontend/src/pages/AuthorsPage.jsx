import React, { useEffect, useState } from 'react';
import useAuthor from '../hooks/useAuthors';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Table, Modal, Button, Form, Container } from 'react-bootstrap';

const MySwal = withReactContent(Swal);

const AuthorsPage = () => {
  const { authors, fetchAuthors, deleteAuthor, updateAuthor, createAuthor } =
    useAuthor();
  const [updatedAuthor, setUpdatedAuthor] = useState({
    id: null,
    first_name: '',
    last_name: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const confirmDelete = async (authorId) => {
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
          await deleteAuthor(authorId);
          MySwal.fire({
            title: 'Deleted!',
            text: 'The author has been deleted.',
            icon: 'success',
            confirmButtonColor: '#78c2ad',
          });
        } catch (error) {
          console.error('Error deleting author:', error);
          MySwal.fire({
            title: 'Error!',
            text: 'Failed to delete author.',
            icon: 'error',
            confirmButtonColor: '#78c2ad',
          });
        }
      }
    });
  };

  const handleUpdate = async () => {
    try {
      await updateAuthor(updatedAuthor.id, updatedAuthor);
      setUpdatedAuthor({ id: null, first_name: '', last_name: '' }); // Reset updated author state
      setShowModal(false);
      MySwal.fire({
        title: 'Updated!',
        text: 'The author has been updated.',
        icon: 'success',
        confirmButtonColor: '#78c2ad',
      });
    } catch (error) {
      console.error('Error updating author:', error);
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to update author.',
        icon: 'error',
        confirmButtonColor: '#78c2ad',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAuthor({ ...updatedAuthor, [name]: value });
  };

  const setAuthorToUpdate = (author) => {
    setUpdatedAuthor({
      id: author.id,
      first_name: author.first_name,
      last_name: author.last_name,
    });
    setShowModal(true);
  };

  const handleAddAuthor = () => {
    setShowModal(true);
  };

  const handleCreateAuthor = async () => {
    try {
      await createAuthor(updatedAuthor);
      setUpdatedAuthor({ id: null, first_name: '', last_name: '' }); // Reset updated author state
      setShowModal(false);
      MySwal.fire({
        title: 'Added!',
        text: 'The author has been added.',
        icon: 'success',
        confirmButtonColor: '#78c2ad',
      });
    } catch (error) {
      console.error('Error creating author:', error);
      MySwal.fire('Error', 'Failed to add author.', 'error');
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to add author.',
        icon: 'error',
        confirmButtonColor: '#ff7851',
      });
    }
  };

  return (
    <div>
      <h1>Authors</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleAddAuthor}>
          <FaPlus /> Add Author
        </Button>
      </div>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.id}>
              <td>{author.first_name}</td>
              <td>{author.last_name}</td>
              <td>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => confirmDelete(author.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setAuthorToUpdate(author)}
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
            {updatedAuthor.id ? 'Update Author' : 'Add Author'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="first_name"
                value={updatedAuthor.first_name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="last_name"
                value={updatedAuthor.last_name}
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
            onClick={updatedAuthor.id ? handleUpdate : handleCreateAuthor}
          >
            {updatedAuthor.id ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AuthorsPage;
