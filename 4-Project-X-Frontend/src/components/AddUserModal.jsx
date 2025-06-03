// src/components/AddUserModal.jsx
import React, { useState } from "react";

export default function AddUserModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onAdd({ name, email });
      setName("");
      setEmail("");
      setIsError(false);
      setErrorMessage("");
      onClose();
    } catch (err) {
      setIsError(true);
      setErrorMessage(err.message);
    }
  };

  const handleOnClose = () => {
    setName("");
    setEmail("");
    setIsError(false);
    setErrorMessage("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Thêm User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {isError && <div className="text-red-500">{errorMessage}</div>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleOnClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
