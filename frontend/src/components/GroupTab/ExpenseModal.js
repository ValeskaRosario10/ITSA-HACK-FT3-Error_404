// ExpensePage.js
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ExpensePage = ({ groups, setGroups }) => {
  const { groupId } = useParams();
  const group = groups[groupId];
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [whoPaid, setWhoPaid] = useState('');

  const handleExpenseSubmit = (event) => {
    event.preventDefault();
    const newExpense = {
      name: expenseName,
      amount: expenseAmount,
      whoPaid,
    };

    const updatedGroups = [...groups];
    updatedGroups[groupId].expenses.push(newExpense);
    setGroups(updatedGroups);

    setExpenseName('');
    setExpenseAmount('');
    setWhoPaid('');
  };

  return (
    <div>
      <h2>{group.groupName}</h2>
      <p>Currency: {group.currency}</p>
      <h4>Members: {group.payingMembers.map(member => member.name).join(', ')}</h4>

      <h3>Expenses:</h3>
      <ul>
        {group.expenses.map((expense, index) => (
          <li key={index}>
            {expense.name}: {expense.amount} - Paid by: {expense.whoPaid}
          </li>
        ))}
      </ul>

      <form onSubmit={handleExpenseSubmit}>
        <div>
          <label>
            Expense Name:
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Who Paid:
            <input
              type="text"
              value={whoPaid}
              onChange={(e) => setWhoPaid(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Add Expense</button>
      </form>

      <Link to="/">Back to Groups</Link>
    </div>
  );
};

export default ExpensePage;
