import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './GroupView.css';

const GroupView = ({ groups, setGroups }) => {
  const { groupName } = useParams();
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false); // State for expense modal
  const [editIndex, setEditIndex] = useState(null); // State to track which expense is being edited

  const group = groups.find((group) => group.groupName === groupName);

  const handleAddExpense = (event) => {
    event.preventDefault();
    if (group) {
      const updatedGroups = [...groups];
      updatedGroups.forEach((g) => {
        if (g.groupName === groupName) {
          g.expenses.push({
            name: expenseName,
            amount: expenseAmount,
            description: expenseDescription,
            paidBy,
          });
        }
      });
      setGroups(updatedGroups);
      resetForm();
    }
  };

  const handleEditExpense = (index) => {
    const expense = group.expenses[index];
    setExpenseName(expense.name);
    setExpenseAmount(expense.amount);
    setExpenseDescription(expense.description);
    setPaidBy(expense.paidBy);
    setEditIndex(index); // Set the index for editing
    setIsExpenseModalOpen(true); // Show the modal when editing
  };

  const handleUpdateExpense = (event) => {
    event.preventDefault();
    const updatedGroups = [...groups];
    updatedGroups.forEach((g) => {
      if (g.groupName === groupName) {
        g.expenses[editIndex] = {
          name: expenseName,
          amount: expenseAmount,
          description: expenseDescription,
          paidBy,
        };
      }
    });
    setGroups(updatedGroups);
    resetForm();
  };

  const handleDeleteExpense = (index) => {
    const updatedGroups = [...groups];
    updatedGroups.forEach((g) => {
      if (g.groupName === groupName) {
        g.expenses.splice(index, 1); // Remove the expense at the specified index
      }
    });
    setGroups(updatedGroups);
  };

  const resetForm = () => {
    setExpenseName('');
    setExpenseAmount('');
    setExpenseDescription('');
    setPaidBy('');
    setIsExpenseModalOpen(false); // Close the modal
    setEditIndex(null); // Reset edit index
  };

  if (!group) {
    return <p>Group not found.</p>;
  }

  return (
    <div className="group-view">
      <h2>{group.groupName}</h2>
      <p>Members: {group.payingMembers.map((member) => member.name).join(', ')}</p>
      <p>Currency: {group.currency}</p>
      
      <h3>Expenses</h3>
      <div className="expenses-container">
        {group.expenses.length > 0 ? (
          group.expenses.map((expense, index) => (
            <div key={index} className="expense-card">
              <h4>{expense.name}</h4>
              <p>Amount: {expense.amount} {group.currency}</p>
              <p>Description: {expense.description}</p>
              <p>Paid By: {expense.paidBy}</p>
              <button className="expense-button" onClick={() => handleEditExpense(index)}>Edit</button>
              <button className="expense-button" onClick={() => handleDeleteExpense(index)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>

      <button className="expense-button" onClick={() => setIsExpenseModalOpen(true)}>
        Add Expense
      </button>

      {/* Add Expense Modal */}
      {isExpenseModalOpen && (
        <div className="modal">
          <button className="close-button" onClick={resetForm}>
            &times;
          </button>
          <h3>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</h3>
          <form onSubmit={editIndex !== null ? handleUpdateExpense : handleAddExpense}>
            <label>
              Expense Name:
              <input 
                type="text" 
                value={expenseName} 
                onChange={(e) => setExpenseName(e.target.value)} 
                required 
              />
            </label>
            <label>
              Amount:
              <input 
                type="number" 
                value={expenseAmount} 
                onChange={(e) => setExpenseAmount(e.target.value)} 
                required 
              />
            </label>
            <label>
              Description:
              <input 
                type="text" 
                value={expenseDescription} 
                onChange={(e) => setExpenseDescription(e.target.value)} 
              />
            </label>
            <label>
              Paid By:
              <input 
                type="text" 
                value={paidBy} 
                onChange={(e) => setPaidBy(e.target.value)} 
                required 
              />
            </label>
            <button className="expense-button" type="submit">{editIndex !== null ? 'Update Expense' : 'Add Expense'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GroupView;
