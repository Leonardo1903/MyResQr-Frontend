import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        Hello World
        <div>
          <ModeToggle />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
