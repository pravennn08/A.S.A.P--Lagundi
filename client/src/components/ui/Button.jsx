import React from "react";

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center text-center rounded-lg px-4 py-2 transition";

  const variants = {
    primary: "bg-brand-green text-white hover:bg-[#07a628] shadow-md",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-gray-300 bg-white text-grayy-700 hover:bg-blue-50",
    noBg: "bg-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
