"use-client";
import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useDarkMode(): [
    darkMode: string|null,
    setDarkMode: (val: string) => void
] {
    const [getValue, setValue] = useLocalStorage("darkMode");

    function setDarkMode(val: string) {
        setValue("darkMode", val);
    }

    useEffect(() => {
        let rootNode = document.documentElement;
        getValue("darkMode") !== "false"
        ? rootNode.classList.add("dark")
        : rootNode.classList.remove("dark");
    });

    return [getValue("darkMode"), setDarkMode];
}
