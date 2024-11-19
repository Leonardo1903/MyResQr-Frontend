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

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/enter-otp" element={<EnterOTP />} />
      </Route>
    )
  );
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <div>
          <ModeToggle />
        </div> */}
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </div>
  );
}

export default App;
