import React from "react";
import { twMerge } from "tailwind-merge";

const cn = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const sizes = {
  sm: "p-4 gap-3 text-sm",
  default: "p-6 gap-4 text-sm",
  lg: "p-8 gap-6 text-base",
};

const Card = ({ className = "", size = "default", children, ...props }) => {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-800 shadow-sm",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className = "", children, ...props }) => {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ className = "", children, ...props }) => {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-xl text-gray-700 font-semibold leading-snug",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardDescription = ({ className = "", children, ...props }) => {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm  text-gray-500", className)}
      {...props}
    >
      {children}
    </p>
  );
};

const CardAction = ({ className = "", children, ...props }) => {
  return (
    <div
      data-slot="card-action"
      className={cn("self-end", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardContent = ({ className = "", children, ...props }) => {
  return (
    <div
      data-slot="card-content"
      className={cn("text-sm text-gray-700", className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ className = "", children, ...props }) => {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center pt-4 border-t", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
};
