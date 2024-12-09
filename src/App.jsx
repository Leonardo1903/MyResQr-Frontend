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
import CreateNewUserByAgent from "./pages/CreateNewUserByAgent";
import { RecoilRoot } from "recoil";
import UserDashboard from "./pages/UserDashboard";
import ProfileUpdate from "./pages/ProfileUpdate";
import MedicalInfoUpdate from "./pages/MedicalInfoUpdate";
import EmergencyContactsUpdate from "./pages/EmergencyContactsUpdate";
import PostScanDashboard from "./pages/PostScanDashboard";
import PostScanLayout from "./PostScanLayout";
import PostScanForm from "./pages/PostScanForm";

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
          <Route path="/medical-info" element={<Signup initialStep={2} />} />
          <Route path="/emergency-info" element={<Signup initialStep={4} />} />
          <Route path="/update-profile" element={<ProfileUpdate />} />
          <Route path="/update-medical-info" element={<MedicalInfoUpdate />} />
          <Route
            path="/update-emergency-info"
            element={<EmergencyContactsUpdate />}
          />
        </Route>
        <Route path="/scan" element={<PostScanLayout />}>
          <Route index element={<PostScanForm />} />
          <Route path="dashboard" element={<PostScanDashboard />} />
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
