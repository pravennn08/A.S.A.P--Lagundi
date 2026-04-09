import React from "react";
import { ArrowLeft } from "lucide-react";

const Navbar = ({
  title = "A.S.A.P LAGUNDI",
  subtitle = "Automated Safety and Action Platform for Barangay Lagundi, Mexico, Pampanga",
  showBackButton = false,
  backLabel = "",
  icon = ArrowLeft,
  onBack,
  logo = "/logo/lagundi.png",
  rightContent,
}) => (
  <header className="border-b border-gray-200 bg-white px-6  shadow lg:px-12">
    <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between py-4">
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="Lagundi Logo"
          className="hidden sm:flex h-18 w-18 rounded-full object-cover"
        />

        <img src="/logo/logo.png" alt={title} className="w-45 " />
      </div>

      <div className="flex items-center gap-3">
        {rightContent}

        {showBackButton && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 sm:text-sm"
          >
            {React.createElement(icon, { className: "h-4 w-4" })}
            {backLabel}
          </button>
        )}
      </div>
    </div>
  </header>
);

export default Navbar;
