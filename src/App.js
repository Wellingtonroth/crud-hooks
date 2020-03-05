import React, { useState } from 'react';
import UserTable from "./components/userTable.js";
import AddUserForm from "./components/addUserForm";
import EditUserForm from "./components/editUserForm";

const App = () => {
  const initialFormState = { id: null, name: '', username: '' }

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false);

  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  };

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  };

  const editRow = user => {
    setEditing(true)

    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false)

    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  };

  return (
    <div>
      <h1>CRUD App with Hooks</h1>
      <div>
        <div>
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
              <div>
                <h2>Add user</h2>
                <AddUserForm addUser={addUser} />
              </div>
            )}
        </div>
        <div>
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
}

export default App;