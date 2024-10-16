import { create } from "zustand";
import toast from "react-hot-toast";
import apiRequest from "../lib/apiRequest.jsx";

export const useAuthStore = create((set) => ({
  user: null,
  isSignup: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLogin: false,
  signup: async (creds) => {
    set({ isSignup: true });
    set({ isSignup: true }); // Optionally set loading state here

    try {
      const response = await apiRequest.post("/auth/signup", creds, {
        headers: { "Content-Type": "application/json" },
      });

      // Assuming 'user' is returned in the response
      set({ user: response.data.user, isSignup: false });
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Signup error:", error); // Log the error for debugging

      // Check if error.response exists before accessing its properties
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);

      // Reset state in case of error
      set({ isSignup: false, user: null });
    }
  },
  login: async (creds) => {
    set({ isLogin: true });
    try {
      const response = await apiRequest.post("/auth/login", creds);
      set({ user: response.data.user, isLogin: false });
      toast.success("Login Successfully");
    } catch (error) {
      set({ use: null, isLogin: false });
      toast.error(error.response.data.message || "Login failed!");
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await apiRequest.post("/auth/logout");
      set({ isLoggingOut: false, user: null });
      toast.success("Logout successfully!");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout failed");
    }
  },
  authCheck: async () => {
    try {
      set({ isCheckingAuth: true });
      const response = await apiRequest.get("/auth/authCheck", {
        headers: { "Content-Type": "application/json" },
      });
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (err) {
      console.log(err);
      set({ isCheckingAuth: false, user: null });
      //   toast.error(error.response.data.message  || "An error occured")
    }
  },
}));
