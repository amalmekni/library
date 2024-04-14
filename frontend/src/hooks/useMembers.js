import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/members/';

const useMembers = () => {
  const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(API_URL);
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const createMember = async (memberData) => {
    try {
      const response = await axios.post(API_URL, memberData);
      setMembers([...members, response.data]);
    } catch (error) {
      console.error('Error creating member:', error);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await axios.delete(`${API_URL}${memberId}/`);
      setMembers(members.filter((member) => member.id !== memberId));
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const updateMember = async (memberId, memberData) => {
    try {
      const response = await axios.put(`${API_URL}${memberId}/`, memberData);
      const updatedMembers = members.map((member) =>
        member.id === memberId ? response.data : member
      );
      setMembers(updatedMembers);
    } catch (error) {
      console.error('Error updating member:', error);
    }
  };

  return { members, fetchMembers, createMember, deleteMember, updateMember };
};

export default useMembers;
