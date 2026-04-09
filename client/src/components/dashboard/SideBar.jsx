import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ChevronUp, X, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function SidebarContent({ menuItems, onClose, isMobile = false }) {
  const { user, logOut } = useAuthStore();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-5">
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <img
            src="/logo/lagundi.png"
            alt="A.S.A.P Lagundi"
            className="h-25 w-25 rounded-full object-cover"
          />
          <img
            src="/logo/logo.png"
            alt="A.S.A.P LAGUNDI"
            className="w-50 -mt-5"
          />
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-600 hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="px-4 pt-6">
        <p className="mb-3 text-sm font-medium text-gray-500">Platform</p>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-lg px-4 py-3 text-[15px] transition ${
                    isActive
                      ? "bg-gray-200 font-medium text-gray-900"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={isActive ? "text-gray-900" : "text-gray-700"}
                      />
                      <span>{item.name}</span>
                    </div>

                    {item.badge && (
                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-brand-green px-2 text-xs font-semibold text-white">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-3">
        <div className="rounded-xl border border-gray-200 bg-[#efefef] px-3 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-500">
                {user?.fullName?.charAt(0)?.toUpperCase() || "?"}
              </div>

              <div className="leading-tight">
                <p className="text-sm font-semibold text-gray-800">
                  {user?.fullName || "No Name"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.username || "No Username"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAccountMenu((prev) => !prev)}
              className="rounded-md p-1 text-gray-600 transition hover:bg-gray-200 hover:text-gray-800"
            >
              <ChevronUp
                size={16}
                className={`transition-transform duration-200 ${
                  showAccountMenu ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {showAccountMenu && (
            <div className="mt-3 border-t border-gray-300 pt-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-gray-50"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function DesktopSidebar({ menuItems }) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[250px] flex-col border-r border-gray-200 bg-[#f7f7f7] lg:flex">
      <SidebarContent menuItems={menuItems} />
    </aside>
  );
}

function MobileSidebar({ isOpen, onClose, menuItems }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[280px] flex-col border-r border-gray-200 bg-[#f7f7f7] transform transition-transform duration-300 ease-in-out sm:w-[300px] lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent menuItems={menuItems} onClose={onClose} isMobile />
      </aside>
    </>
  );
}

function Sidebar({ isOpen, onClose, menuItems = [] }) {
  return (
    <>
      <DesktopSidebar menuItems={menuItems} />
      <MobileSidebar isOpen={isOpen} onClose={onClose} menuItems={menuItems} />
    </>
  );
}

export default Sidebar;
