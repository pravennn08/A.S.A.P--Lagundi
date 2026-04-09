import React, { useState, useEffect } from "react";
import Button from "../ui/Button";

const statusOptions = ["Active", "Inactive"];

const UserDetailsModal = ({ user, isOpen, onClose, onStatusChange }) => {
  const [selectedStatus, setSelectedStatus] = useState("Active");

  useEffect(() => {
    if (user?.status) {
      setSelectedStatus(user.status);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = () => {
    onStatusChange(user.id, selectedStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">User Details</h2>
            <p className="mt-1 text-sm text-slate-500">
              View and update account information
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-2xl leading-none text-slate-400 hover:text-slate-600"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              User ID
            </label>
            <input
              value={user.id}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              value={user.fullName}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Username
            </label>
            <input
              value={user.username}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Role
            </label>
            <input
              value={user.role}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Contact Number
            </label>
            <input
              value={user.contactNumber || "No Contact"}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Address
            </label>
            <input
              value={user.address || "No Address"}
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Created At
            </label>
            <input
              value={
                user?.createdAt ? new Date(user.createdAt).toLocaleString() : ""
              }
              readOnly
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none focus:border-blue-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
