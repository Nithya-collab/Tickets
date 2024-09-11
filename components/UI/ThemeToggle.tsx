"use client"
import { Button } from "@/components/UI/Button";
import { useDarkMode } from "@/utils/hooks/useDarkMode";
import { Switch } from "./Switch";


interface ThemeToggleProps {
    
}

function toggle(value: boolean){
  return !value;
}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {

  const [darkMode, setDarkMode] = useDarkMode();

  function toggleTheme() {
    let LSValue = darkMode === "false" ?? toggle(Boolean(darkMode)); 
    setDarkMode(String(LSValue));
  }
  
    return ( 
        <label htmlFor="toggle-theme" className="dark:text-black">
          Dark mode {" "}
          <Switch id="toggle-theme" defaultChecked={darkMode !== "false"} onCheckedChange={toggleTheme}></Switch>
        </label>

     );
}
 
export default ThemeToggle;