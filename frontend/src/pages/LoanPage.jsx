import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import useLoans from '../hooks/useLoans';
import useBooks from '../hooks/useBooks';
import useMembers from '../hooks/useMembers';

const LoanPage = () => {
  const { loans, fetchLoans, createLoan, borrowBook, returnLoan } = useLoans();
  const { books, fetchBooks } = useBooks();
  const { members, fetchMembers } = useMembers();
  const [showModal, setShowModal] = useState(false);
  const [memberId, setMemberId] = useState('');
  const [bookId, setBookId] = useState('');

  useEffect(() => {
    fetchLoans();
    fetchBooks();
    fetchMembers();
  }, []);

  const handleAddLoan = () => {
    setShowModal(true);
  };

  const handleCreateLoan = async () => {
    try {
      // Check if both bookId and memberId are selected
      if (!bookId || !memberId) {
        console.error('Both book and member must be selected.');
        return;
      }

      // Create a new loan object
      const newLoan = {
        book: parseInt(bookId),
        member: parseInt(memberId),
        loan_date: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
      };

      // Send the new loan object to createLoan function
      await createLoan(newLoan);
      setShowModal(false);
      await fetchLoans();
    } catch (error) {
      console.error('Error creating loan:', error);
    }
  };

  const handleBorrow = async () => {
    try {
      await borrowBook(memberId, bookId);
      await fetchLoans();
      setMemberId('');
      setBookId('');
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  };

  const handleReturn = async (loanId) => {
    try {
      await returnLoan(loanId);
      await fetchLoans();
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  const getBookTitle = (bookId) => {
    const book = books.find((book) => book.id === bookId);
    return book ? book.title : '';
  };

  const getMemberName = (memberId) => {
    const member = members.find((member) => member.id === memberId);
    return member ? member.name : '';
  };

  const getFormattedDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : 'N/A';
  };

  return (
    <div>
      <h1>Loans</h1>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={handleAddLoan}>
          <FaPlus /> Add Loan
        </Button>
      </div>

      {/* Loans table */}
      <Table striped bordered hover className="text-center">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Member Name</th>
            <th>Loan Date</th>
            <th>Return Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{getBookTitle(loan.book)}</td>
              <td>{getMemberName(loan.member)}</td>
              <td>{getFormattedDate(loan.loan_date)}</td>
              <td>{getFormattedDate(loan.return_date)}</td>
              <td>
                {loan.return_date ? (
                  <Button className="btn btn-secondary mx-2" disabled={true}>
                    Returned
                  </Button>
                ) : (
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() => handleReturn(loan.id)}
                  >
                    Return
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Loan Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {/* Modal header */}
        <Modal.Header closeButton>
          <Modal.Title>Add Loan</Modal.Title>
        </Modal.Header>
        {/* Modal body */}
        <Modal.Body>
          {/* Loan form */}
          <Form>
            {/* Member ID dropdown */}
            <Form.Group controlId="formMemberId">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                as="select"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
              >
                <option value="">Select member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Book ID dropdown */}
            <Form.Group controlId="formBookId">
              <Form.Label>Book ID</Form.Label>
              <Form.Control
                as="select"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              >
                <option value="">Select book</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* Modal footer */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateLoan}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoanPage;
