import React, { useEffect, useMemo, useState } from "react";
import { User } from "lucide-react";
import Button from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import ResetPasswordSection from "../../components/settings/ResetPasswordSection";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/useAuthStore";
import Spinner from "../../utils/Spinner";

const Settings = () => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const { user, isLoading, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    contactNumber: "",
    userId: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      const formattedData = {
        fullName: user.fullName || "",
        username: user.username || "",
        contactNumber: user.contactNumber || "No Contact",
        userId: user._id || "",
        role: user.role || "",
        status: user.status || "",
      };

      setFormData(formattedData);
      setInitialData(formattedData);
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    if (!initialData) return;
    setFormData(initialData);
  };

  // Only name, username, and contact nunmber are editable
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(formData.userId, {
        fullName: formData.fullName,
        username: formData.username,
        contactNumber: formData.contactNumber,
      });

      setInitialData(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const isChanged = useMemo(() => {
    if (!initialData) return false;
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  }, [formData, initialData]);
  if (isLoading) return <Spinner />;
  return (
    <section className="min-h-screen p-5 md:p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-700">
          Settings
        </h1>
        <p className="text-sm text-slate-600">
          System configuration and account settings
        </p>
      </div>

      <Card className="rounded-3xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50">
            <User className="h-5 w-5 text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700">
            Account Information
          </h2>
        </div>

        <CardContent className="space-y-8 pt-4">
          {loading ? (
            <p className="text-sm text-gray-500">
              Loading account information...
            </p>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-20">
                  <div className="space-y-5">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:border-blue-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Role
                      </label>
                      <input
                        type="text"
                        value={capitalize(formData.role)}
                        disabled
                        className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Status
                      </label>
                      <input
                        type="text"
                        value={capitalize(formData.status)}
                        disabled
                        className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:border-blue-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        Contact Number
                      </label>
                      <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-2 text-gray-700 focus:border-blue-900 outline-none"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm text-gray-700">
                        User ID
                      </label>
                      <input
                        type="text"
                        value={formData.userId}
                        disabled
                        className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                {isChanged && (
                  <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>

                    <Button type="submit" variant="primary">
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>

              <ResetPasswordSection />
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Settings;
