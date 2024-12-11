import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function PostScanLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PostScanLayout;
