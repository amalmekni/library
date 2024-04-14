// useLoans.js
import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/loans/';

const useLoans = () => {
  const [loans, setLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const response = await axios.get(API_URL);
      setLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const createLoan = async (loanData) => {
    try {
      const response = await axios.post(API_URL, loanData);
      setLoans([...loans, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error;
    }
  };

  const deleteLoan = async (loanId) => {
    try {
      await axios.delete(`${API_URL}${loanId}/`);
      setLoans(loans.filter((loan) => loan.id !== loanId));
    } catch (error) {
      console.error('Error deleting loan:', error);
      throw error;
    }
  };

  const updateLoan = async (loanId, loanData) => {
    try {
      const response = await axios.put(`${API_URL}${loanId}/`, loanData);
      const updatedLoans = loans.map((loan) =>
        loan.id === loanId ? response.data : loan
      );
      setLoans(updatedLoans);
      return response.data;
    } catch (error) {
      console.error('Error updating loan:', error);
      throw error;
    }
  };

  const borrowBook = async (memberId, bookId, loanDate) => {
    try {
      const response = await axios.post(`${API_URL}borrow/`, {
        member_id: memberId,
        book_id: bookId,
        loan_date: loanDate,
      });
      return response.data;
    } catch (error) {
      console.error('Error borrowing book:', error);
      throw error;
    }
  };

  const returnLoan = async (loanId) => {
    try {
      const response = await axios.post(`${API_URL}${loanId}/return_loan/`);
      return response.data;
    } catch (error) {
      console.error('Error returning loan:', error);
      throw error;
    }
  };

  const fetchOverdueBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}overdue/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching overdue books:', error);
      throw error;
    }
  };

  const fetchNonReturnedBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}nonreturned/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching non-returned books:', error);
      throw error;
    }
  };

  const fetchMostBorrowedBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}mostborrowed/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching most borrowed books:', error);
      throw error;
    }
  };

  const fetchLoansByMemberClass = async () => {
    try {
      const response = await axios.get(`${API_URL}byclass/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching loans by member class:', error);
      throw error;
    }
  };

  return {
    loans,
    fetchLoans,
    createLoan,
    deleteLoan,
    updateLoan,
    borrowBook,
    returnLoan,
    fetchOverdueBooks,
    fetchNonReturnedBooks,
    fetchMostBorrowedBooks,
    fetchLoansByMemberClass,
  };
};

export default useLoans;
