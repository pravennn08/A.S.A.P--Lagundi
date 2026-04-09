import { Menu } from "lucide-react";

const Topbar = ({ title, onMenuClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:left-[250px]">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-semibold text-gray-700 sm:text-xl">
          {title}
        </h1>
      </div>

      <div className="hidden text-sm text-gray-500 sm:block">Admin Panel</div>
    </header>
  );
};

export default Topbar;
