//frontend/src/components/GroupTab.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import './GroupTab.css'; // Import any styles

Modal.setAppElement('#root'); // Setting the root element for accessibility

const GroupTab = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [moneySpent, setMoneySpent] = useState('');
  const [whoPaidBill, setWhoPaidBill] = useState('');
  const [payingMembers, setPayingMembers] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [groups, setGroups] = useState([]); // State to hold the list of groups
  const [isSingleUserModalOpen, setIsSingleUserModalOpen] = useState(false);
  const [singleUser, setSingleUser] = useState({ name: '', email: '', amount: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSingleUserModal = () => {
    setIsSingleUserModalOpen(true);
  };

  const closeSingleUserModal = () => {
    setIsSingleUserModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newGroup = {
      groupName,
      moneySpent,
      payingMembers,
      whoPaidBill,
    };

    if (isEditing) {
      const updatedGroups = groups.map((group, index) =>
        index === editingIndex ? newGroup : group
      );
      setGroups(updatedGroups);
    } else {
      // Add the new group to the groups state
      setGroups([...groups, newGroup]);
    }

    // Reset form fields
    setGroupName('');
    setMoneySpent('');
    setWhoPaidBill('');
    setPayingMembers([]);

    closeModal();
  };

  const addPayingMember = () => {
    if (newName.trim() && newEmail.trim()) {
      setPayingMembers([...payingMembers, { name: newName, email: newEmail }]);
      setNewName('');
      setNewEmail('');
    }
  };

  const removePayingMember = (index) => {
    const updatedMembers = payingMembers.filter((_, i) => i !== index);
    setPayingMembers(updatedMembers);
  };

  const handleSingleUserSubmit = (event) => {
    event.preventDefault();
    const { name, email, amount, payer } = singleUser;
    if (name.trim() && email.trim() && amount.trim()) {
      setGroups([...groups, { groupName: `${name}`, moneySpent: amount, payingMembers: [{ name, email }], whoPaidBill: payer }]);
      setSingleUser({ name: '', email: '', amount: '' });
    }
    closeSingleUserModal();
  };

  const addMemberToGroup = (index) => {
    console.log(`Add member to group: ${groups[index].groupName}`);
    // You can open a modal to handle adding members here
  };
  
  return (
    <div className="group-tab">
      <h2>Group Tab</h2>
      <button onClick={openModal}>Add Group</button>
      <button onClick={openSingleUserModal} style={{ marginLeft: '10px' }}>Add User</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Group Modal"
        className="modal"
        overlayClassName="overlay"
      >
        {/* Close Button */}
        <button className="close-button" onClick={closeModal}>
          &times;
        </button>

        <h2>Create Group</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Group Name:
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Total expense:
              <input
                type="number"
                value={moneySpent}
                onChange={(e) => setMoneySpent(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label>Who are Paying:</label>
            <div className="input-group">
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
              <button type="button" onClick={addPayingMember}>
                Add
              </button>
            </div>
          </div>
          <div>
            <ul>
              {payingMembers.map((member, index) => (
                <li key={index}>
                  {member.name} ({member.email})
                  <button
                    type="button"
                    onClick={() => removePayingMember(index)}
                    style={{ marginLeft: '10px' }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label>
              Paid by:
              <input
                type="text"
                value={whoPaidBill}
                onChange={(e) => setWhoPaidBill(e.target.value)}
                required
              />
            </label>
          </div>
          <button type="submit">Save Group</button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </Modal>

      {/* Modal for adding a single user */}
      <Modal
        isOpen={isSingleUserModalOpen}
        onRequestClose={closeSingleUserModal}
        contentLabel="Add Single User Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-button" onClick={closeSingleUserModal}>
          &times;
        </button>
        <h2>Add User</h2>
        <form onSubmit={handleSingleUserSubmit}>
          <div>
          Who is paying: 
            <label>
              Name:
              <input
                type="text"
                value={singleUser.name}
                onChange={(e) => setSingleUser({ ...singleUser, name: e.target.value })}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                value={singleUser.email}
                onChange={(e) => setSingleUser({ ...singleUser, email: e.target.value })}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Paid by:
              <input
                type="text"
                value={singleUser.payer}
                onChange={(e) => setSingleUser({ ...singleUser, payer: e.target.value })}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Amount Paid:
              <input
                type="number"
                value={singleUser.amount}
                onChange={(e) => setSingleUser({ ...singleUser, amount: e.target.value })}
                required
              />
            </label>
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={closeSingleUserModal}>
            Cancel
          </button>
        </form>
      </Modal>

      {/* Display the list of created groups */}
      <div className="groups-container">
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <div key={index} className="group-card">
              <h3>{group.groupName}</h3>
              <p>Total Expense: ₹{group.moneySpent}</p>
              <p>Paid by: {group.whoPaidBill}</p>
              <div>
                <h4>Paying Members:</h4>
                <ul>
                  {group.payingMembers.length > 0 ? (
                    group.payingMembers.map((member, idx) => (
                      <li key={idx}>
                        {member.name} ({member.email})
                      </li>
                    ))
                  ) : (
                    <li>No paying members added yet.</li>
                  )}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No groups created yet.</p>
        )}
      </div>
    </div>
  );
};

export default GroupTab;
