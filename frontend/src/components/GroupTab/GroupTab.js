import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GroupTab.css';

const GroupTab = ({ groups, setGroups }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false); // State for expense modal
  const [groupName, setGroupName] = useState('');
  const [payingMembers, setPayingMembers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [editIndex, setEditIndex] = useState(null);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null); // To track selected group for adding expense
  const navigate = useNavigate();

  const handleAddExpense = (event) => {
    event.preventDefault();
    const updatedGroups = [...groups];
    updatedGroups[selectedGroupIndex].expenses.push({ name: expenseName, amount: expenseAmount, description: expenseDescription });
    setGroups(updatedGroups); // This should now work correctly
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDescription('');
    setIsExpenseModalOpen(false);
    setSelectedGroupIndex(null); // Reset selected group index
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGroup = { groupName, payingMembers, expenses: [], currency };
    
    if (editIndex !== null) {
      const updatedGroups = [...groups];
      updatedGroups[editIndex] = newGroup;
      setGroups(updatedGroups);
      setEditIndex(null);
    } else {
      setGroups([...groups, newGroup]);
    }

    setGroupName('');
    setPayingMembers([]);
    setCurrency('USD');
    setIsModalOpen(false);
  };

  const openGroupExpenses = (groupName) => {
    navigate(`/group/${groupName}`);
  };

  const handleEdit = (index) => {
    const groupToEdit = groups[index];
    setGroupName(groupToEdit.groupName);
    setPayingMembers(groupToEdit.payingMembers);
    setCurrency(groupToEdit.currency);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedGroups = groups.filter((_, i) => i !== index);
    setGroups(updatedGroups);
  };

  return (
    <div className="group-tab">
      <h2>Group Expenses</h2>
      <button onClick={() => setIsModalOpen(true)}>Create Group</button>

      <div className="groups-container">
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <div key={index} className="group-card" style={{ cursor: 'pointer' }}>
              <h3 onClick={() => openGroupExpenses(group.groupName)}>{group.groupName}</h3>
              <p>Members: {group.payingMembers.map((member) => member.name).join(', ')}</p>
              <p>Currency: {group.currency}</p>
              <p>Expenses: {group.expenses.map(exp => exp.name).join(', ')}</p>
              {/* Edit and Delete Buttons */}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No groups created yet.</p>
        )}
      </div>

      {/* Create Group Modal */}
      {isModalOpen && (
        <div className="modal">
          <button className="close-button" onClick={() => setIsModalOpen(false)}>
            &times;
          </button>
          <h2>{editIndex !== null ? 'Edit Group' : 'Create Group'}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Group Name:
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </label>
            <label>
              Currency:
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
              </select>
            </label>
            <label>
              Members:
              <input
                type="text"
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <button
                type="button"
                onClick={() => {
                  if (newName && newEmail) {
                    setPayingMembers([...payingMembers, { name: newName, email: newEmail }]);
                    setNewName('');
                    setNewEmail('');
                  }
                }}
              >
                Add
              </button>
            </label>
            <button type="submit">{editIndex !== null ? 'Update Group' : 'Create Group'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GroupTab;
