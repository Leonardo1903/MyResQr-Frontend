import { ThemeProvider } from "./components/theme-provider";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import EnterOTP from "./pages/EnterOTP";
import React, { lazy, Suspense } from "react";
import CreateNewUserByAgent from "./pages/CreateNewUserByAgent";
import { RecoilRoot } from "recoil";
import UserDashboard from "./pages/UserDashboard";



function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/agent-dashboard" element={<CreateNewUserByAgent />} />
      </Route>
      
      </>
    )
  );
  return (
    <div>
      <RecoilRoot>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
          <Toaster />
        </ThemeProvider>
      </RecoilRoot>
    </div>
  );
}

export default App;
