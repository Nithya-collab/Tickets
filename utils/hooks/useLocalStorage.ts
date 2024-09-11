"use client";

import { useState } from "react";

type LocalStorageState = [
    getValue: (key: string) => string | null,
    setValue: (key: string, val: string) => void,
    delValue: (key: string) => void
];

export function useLocalStorage(key: string): LocalStorageState {
    const [val, setVal] = useState<string | null>(getValue(key));

    function getValue(key: string) {
        let value = window.localStorage.getItem(key);
        //    return value ? value:JSON.stringify(value);
        return value;
    }

    const setValue = function (key: string, val: string) {
        try {
            window.localStorage.setItem(key, val);
            setVal(getValue(key));
        } catch (error) {
            if (error instanceof DOMException) {
                throw new Error(`Local Storage error: ${error.message} `, {
                    cause: error,
                });
            }
            throw error;
        }
    };

    const delValue = function delLSItem(key: string) {
        return window.localStorage.removeItem(key);
    };

    return [getValue, setValue, delValue];
}
