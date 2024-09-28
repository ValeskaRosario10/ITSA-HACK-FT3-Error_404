import React from 'react';

const GroupCard = ({ group, onClick }) => {
  return (
    <div className="group-card" onClick={() => onClick(group)}>
      <h3>{group.groupName}</h3>
      <p>Total Money Spent: {group.moneySpent ? `₹${group.moneySpent}` : '₹0'}</p>
      <p>Members: {group.payingMembers.map(member => member.name).join(', ')}</p>
      {group.expenses.length > 0 && (
        <div>
          <h4>Expenses:</h4>
          <ul>
            {group.expenses.map((expense, expIndex) => (
              <li key={expIndex}>
                {`₹${expense.amount}`} - Paid by: {expense.whoPaid} 
                (Contributors: {expense.membersPaying.join(', ')})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
