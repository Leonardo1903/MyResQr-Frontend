import { useTheme } from "./theme-provider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center space-x-4">
      <Label className="relative inline-flex items-center cursor-pointer">
        <Input
          type="checkbox"
          className="sr-only"
          checked={theme === "dark"}
          onChange={handleToggle}
        />
        <div className="w-14 h-8 bg-gray-200 rounded-full dark:bg-gray-700 flex items-center">
          <div
            className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform ${
              theme === "dark" ? "translate-x-6" : ""
            }`}
          />
        </div>
      </Label>
    </div>
  );
}
