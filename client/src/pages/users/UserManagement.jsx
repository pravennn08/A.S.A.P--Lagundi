import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  UserPlus,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import UserDetailsModal from "../../components/users/UserDetailsModal";
import CreateAccountModal from "../../components/users/CreateAccountModal";
import Spinner from "../../utils/Spinner";
import { useUserStore } from "../../store/useUserStore";
const roleOptions = ["All Roles", "Admin", "Tanod"];
const statusOptions = ["All Statuses", "Active", "Inactive"];

const roleBadgeStyles = {
  Admin: "bg-brand-green text-white",
  Tanod: "bg-gray-100 text-gray-700",
};

const statusBadgeStyles = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-red-100 text-red-700",
};

const FilterSelect = ({ label, icon: Icon, value, onChange, options }) => {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-700">
        {Icon && <Icon size={18} />}
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="h-10 w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 pr-10 text-sm font-medium text-gray-700 shadow-sm outline-none transition-all duration-200 hover:bg-blue-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
};

const UserManagement = () => {
  const {
    users,
    fetchUsers,
    setUsers,
    isLoading,
    updateUserStatus,
    addUser,
    deleteUser,
  } = useUserStore();
  const [selectedUser, setSelectedUser] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleView = (user) => {
    setSelectedUser(user);
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);

    if (selectedUser?.id === id) {
      setSelectedUser(null);
    }
  };

  const handleOpenCreate = () => {
    setIsCreateOpen(true);
  };

  const handleCloseCreate = () => {
    setIsCreateOpen(false);
  };

  const handleCreateAccount = async (formData) => {
    const newUser = await addUser(formData);

    if (newUser) {
      setIsCreateOpen(false);
    }
  };
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        user.id.toLowerCase().includes(term) ||
        user.fullName.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.contactNumber.toLowerCase().includes(term);

      const matchesRole =
        roleFilter === "All Roles" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Statuses" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);
  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-700">User Management</h1>
          <p className="text-sm text-slate-600">
            Manage barangay personnel accounts
          </p>
        </div>

        <Button
          variant="primary"
          className="inline-flex items-center gap-2 self-start px-5 py-3"
          onClick={handleOpenCreate}
        >
          <UserPlus size={18} />
          Create Account
        </Button>
      </div>

      <Card className="mb-6 rounded-2xl" size="default">
        <CardHeader>
          <CardTitle className="text-2xl">Filters</CardTitle>
          <CardDescription>
            Search and filter users by role and account status
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div>
              <label className="mb-2 flex items-center gap-2 text-base font-semibold text-gray-700">
                <Search size={18} />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by ID, name, username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <FilterSelect
              label="Role"
              icon={Filter}
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={roleOptions}
            />

            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl" size="default">
        <CardHeader>
          <CardTitle className="text-xl">
            All Users ({filteredUsers.length})
          </CardTitle>
          <CardDescription>
            View and manage all registered barangay personnel
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-0">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-900">
                  <th className="border-b border-gray-200 px-4 py-4">
                    User ID
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Full Name
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Username
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">Role</th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Contact Number
                  </th>
                  <th className="border-b border-gray-200 px-4 py-4">Status</th>
                  <th className="border-b border-gray-200 px-4 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="text-sm text-slate-800">
                      <td className="border-b border-gray-200 px-4 py-4 font-semibold">
                        {user.id}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        {user.fullName}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        {user.username}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            roleBadgeStyles[user.role] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        {user.contactNumber || "No Contact"}
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            statusBadgeStyles[user.status] ||
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="border-b border-gray-200 px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleView(user)}
                            className="inline-flex items-center gap-2 rounded-xl px-4 py-2"
                          >
                            <Pencil size={16} />
                            Edit
                          </Button>

                          <Button
                            variant="outline"
                            onClick={() => handleDelete(user.id)}
                            className="inline-flex items-center gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <UserDetailsModal
        key={selectedUser?.id}
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={handleCloseModal}
        onStatusChange={updateUserStatus}
      />

      <CreateAccountModal
        isOpen={isCreateOpen}
        onClose={handleCloseCreate}
        onCreateAccount={handleCreateAccount}
        usersCount={users.length}
      />
    </div>
  );
};

export default UserManagement;
