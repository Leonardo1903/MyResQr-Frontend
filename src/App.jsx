import { ThemeProvider } from "./components/theme-provider";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import "./App.css";

import Layout from "./layout";
import Home from "./pages/Home";
import Login from "./pages/Login";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
        <Route path='' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
      </Route>
    )
  )
  return (
    <div >
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <div>
          <ModeToggle />
        </div> */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
