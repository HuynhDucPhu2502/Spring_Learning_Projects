// UserCard.jsx
import React from "react";

export default function UserCard({ user, onDelete, onUpdate }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
      <h2 className="text-lg font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => onUpdate(user)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
