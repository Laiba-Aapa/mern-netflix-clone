import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLogin } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <div className="h-screen w-full hero-bg bg-center">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>

      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/80 rounded-lg shadow-md">
          <h1 className="text-white text-center font-bold text-2xl mb-4 ">
            Log in
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm fomt-medium text-gray-300 block"
              >
                Email
              </label>

              <input
                type="text"
                name="email"
                id="email"
                placeholder="you@example.com"
                className="px-3 w-full py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm fomt-medium text-gray-300 block"
              >
                Password
              </label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="******"
                className="px-3 w-full py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLogin}
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              {isLogin ? "Loading..." : "Log in"}
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
