import React, { useEffect, useState } from "react";
import {
  addUser,
  fetchUser,
  removeUser,
  updateUser,
} from "../services/UserService";
import UserCard from "../components/UserCard";
import AddUserModal from "../components/AddUserModal";
import UpdateUserModal from "../components/UpdateUserModal";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [isAddUserModalOpen, setisAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const doFetch = async () => {
      const users = await fetchUser();
      setUsers(users);
    };

    doFetch();
  }, [refetch]);

  const handleAddUser = async (user) => {
    const res = await addUser(user);
    setRefetch(!refetch);
    return res;
  };

  const handleUpdateUser = async (id, user) => {
    const res = await updateUser(id, user);
    setRefetch(!refetch);
    return res;
  };

  const handleDeleteUser = async (id) => {
    await removeUser(id);
    setRefetch(!refetch);
  };

  const handleOpenUpdateUserModal = (user) => {
    setIsUpdateUserModalOpen(true);
    setSelectedUser(user);
  };

  return (
    <>
      <UpdateUserModal
        isOpen={isUpdateUserModalOpen}
        onClose={() => setIsUpdateUserModalOpen(false)}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
      <AddUserModal
        isOpen={isAddUserModalOpen}
        onClose={() => setisAddUserModalOpen(false)}
        onAdd={handleAddUser}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold mb-4">Danh sách Users</h1>
          <button
            onClick={() => setisAddUserModalOpen(true)}
            className="px-2 py-1 bg-orange-500 hover:bg-orange-600 rounded-lg text-white font-bold"
          >
            Thêm User
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDeleteUser}
              onUpdate={handleOpenUpdateUserModal}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default UsersPage;
