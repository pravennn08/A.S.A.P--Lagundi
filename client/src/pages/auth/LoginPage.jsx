import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/Card";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { GoArrowLeft } from "react-icons/go";
import { useAuthStore } from "../../store/useAuthStore.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const { logIn, isLoading } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await logIn(username, password);

      if (!user) return;
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "tanod") {
        navigate("/personnel/dashboard");
      }

      toast.success("Login successful");
    } catch (err) {}
  };

  return (
    <Card className="w-full max-w-md lg:p-10 shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-7700">
          Admin Login
        </CardTitle>
        <CardDescription className=" text-sm text-gray-500">
          Sign in to access the dashboard
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-3 border-t-1 border-gray-200 bg-transparent">
        <Button
          type="button"
          variant="noBg"
          className="w-full gap-2 flex items-center justify-center underline "
          onClick={() => navigate("/")}
        >
          <GoArrowLeft />
          Back to Home
        </Button>
      </CardFooter>
    </Card>
  );
};
const LoginPage = () => {
  return (
    <Card
      className="min-h-screen  flex items-center justify-center bg-cover bg-center bg-no-repeat  px-6 lg:px-12"
      style={{
        backgroundImage: "url('/bg/bg2.png')",
      }}
    >
      <div className="w-full max-w-6xl bg-white/90 shadow-lg rounded-xl px-6 py-10 lg:px-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center">
            <div className="flex flex-col items-center gap-6">
              <img
                src="/logo/lagundi.png"
                alt="Lagundi Logo"
                className="w-30 h-30 lg:w-48 lg:h-48 rounded-full object-cover"
              />

              <div className="flex flex-col items-center">
                <p className="text-xs sm:text-xs tracking-widest text-gray-400 ">
                  BARANGAY LAGUNDI <span className="mx-2">|</span> DIGITAL
                  RESPONSE
                </p>

                <img
                  src="/logo/logo.png"
                  alt="A.S.A.P LAGUNDI"
                  className="w-100"
                />

                <p className="text-gray-400 max-w-md mx-auto ">
                  Streamlining incident reporting and emergency response for a
                  safer, more connected community.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex justify-center w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LoginPage;
