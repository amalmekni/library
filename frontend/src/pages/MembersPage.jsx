import React, { useEffect, useState } from 'react';
import useMembers from '../hooks/useMembers'; // Import the useMembers hook
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Table, Modal, Button, Form } from 'react-bootstrap';

const MySwal = withReactContent(Swal);

const MembersPage = () => {
  const { members, fetchMembers, deleteMember, updateMember, createMember } =
    useMembers(); // Use the useMembers hook
  const [updatedMember, setUpdatedMember] = useState({
    id: null,
    name: '',
    num_loans: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const confirmDelete = async (memberId) => {
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
          await deleteMember(memberId);
          MySwal.fire({
            title: 'Deleted!',
            text: 'The member has been deleted.',
            icon: 'success',
            confirmButtonColor: '#78c2ad',
          });
        } catch (error) {
          console.error('Error deleting member:', error);
          MySwal.fire({
            title: 'Error!',
            text: 'Failed to delete member.',
            icon: 'error',
            confirmButtonColor: '#78c2ad',
          });
        }
      }
    });
  };

  const handleUpdate = async () => {
    try {
      await updateMember(updatedMember.id, updatedMember);
      setUpdatedMember({
        id: null,
        name: '',
        num_loans: '',
      }); // Reset updated member state
      setShowModal(false);
      MySwal.fire({
        title: 'Updated!',
        text: 'The member has been updated.',
        icon: 'success',
        confirmButtonColor: '#78c2ad',
      });
    } catch (error) {
      console.error('Error updating member:', error);
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to update member.',
        icon: 'error',
        confirmButtonColor: '#78c2ad',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember({ ...updatedMember, [name]: value });
  };

  const setMemberToUpdate = (member) => {
    setUpdatedMember({
      id: member.id,
      name: member.name,
      num_loans: member.num_loans,
    });
    setShowModal(true);
  };

  const handleAddMember = () => {
    setShowModal(true);
  };

  const handleCreateMember = async () => {
    try {
      await createMember(updatedMember);
      setUpdatedMember({
        id: null,
        name: '',
        num_loans: '',
      }); // Reset updated member state
      setShowModal(false);
      MySwal.fire({
        title: 'Added!',
        text: 'The member has been added.',
        icon: 'success',
        confirmButtonColor: '#78c2ad',
      });
    } catch (error) {
      console.error('Error creating member:', error);
      MySwal.fire({
        title: 'Error!',
        text: 'Failed to add member.',
        icon: 'error',
        confirmButtonColor: '#ff7851',
      });
    }
  };

  return (
    <div>
      <h1>Members</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleAddMember}>
          <FaPlus /> Add Member
        </Button>
      </div>

      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Loans</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.num_loans}</td>
              <td>
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => confirmDelete(member.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setMemberToUpdate(member)}
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
            {updatedMember.id ? 'Update Member' : 'Add Member'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={updatedMember.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formNumLoans">
              <Form.Label>Number of Loans</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of loans"
                name="num_loans"
                value={updatedMember.num_loans}
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
            onClick={updatedMember.id ? handleUpdate : handleCreateMember}
          >
            {updatedMember.id ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MembersPage;
