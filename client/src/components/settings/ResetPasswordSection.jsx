import React, { useState } from "react";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import Button from "../ui/Button";
import { toast } from "react-toastify";
import Spinner from "../../utils/Spinner";
import { useAuthStore } from "../../store/useAuthStore";

const ResetPasswordSection = () => {
  const { isLoading, resetPassword } = useAuthStore();

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const togglePasswordSection = () => {
    setShowPasswordSection((prev) => !prev);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClearPasswordFields = () => {
    setPasswordData({
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!passwordData.newPassword || !passwordData.confirmPassword) {
        toast.error("Please fill in both password fields.");
        return;
      }

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      await resetPassword(
        passwordData.newPassword,
        passwordData.confirmPassword,
      );
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      });

      handleClearPasswordFields();
      setShowPasswordSection(false);
    } catch (error) {}
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="border-t border-gray-100 pt-6">
      <button
        type="button"
        onClick={togglePasswordSection}
        className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left transition hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
            <Lock className="h-5 w-5 text-gray-700" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-700">
              Reset Password
            </h3>
            <p className="text-sm text-gray-500">
              Change your account password
            </p>
          </div>
        </div>

        {showPasswordSection ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {showPasswordSection && (
        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-700 outline-none transition focus:border-blue-900"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-700 outline-none transition focus:border-blue-900"
              />
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearPasswordFields}
            >
              Clear
            </Button>

            <Button type="submit" variant="primary">
              Update Password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordSection;
