import React, { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import Button from "../ui/Button";

const roleOptions = ["Admin", "Tanod"];
const statusOptions = ["Active", "Inactive"];

const CreateAccountModal = ({
  isOpen,
  onClose,
  onCreateAccount,
  usersCount,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    role: "Admin",
    contactNumber: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({
    password: "",
    contactNumber: "",
  });

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    if (field === "contactNumber") {
      value = value.replace(/\D/g, "").slice(0, 11);
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      password: "",
      contactNumber: "",
    };

    let isValid = true;

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isValid = false;
    }

    if (!/^\d{11}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 11 digits.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    onCreateAccount({
      ...formData,
      role: formData.role.toLowerCase(),
      status: formData.status.toLowerCase(),
    });

    setFormData({
      fullName: "",
      username: "",
      password: "",
      role: "Admin",
      contactNumber: "",
      status: "Active",
    });

    setErrors({
      password: "",
      contactNumber: "",
    });
  };

  const inputClass =
    "h-10 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white";

  const selectClass =
    "h-10 w-full appearance-none rounded-xl border border-gray-200 bg-gray-100 px-4 pr-10 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create New Account
          </h2>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Juan Dela Cruz"
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={inputClass}
                required
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role
              </label>
              <div className="relative">
                <select
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className={selectClass}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="09123456789"
                value={formData.contactNumber}
                onChange={(e) => handleChange("contactNumber", e.target.value)}
                className={inputClass}
                required
              />
              {errors.contactNumber && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.contactNumber}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="relative">
                <select
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                  className={selectClass}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl px-6 py-2.5"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              className="rounded-xl px-6 py-2.5"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountModal;
