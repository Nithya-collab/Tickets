"use client"

import { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<ButtonHTMLAttributes<HTMLButtonElement>> {
    children: React.ReactNode,
    handleClick: React.MouseEventHandler
}
export const Button = ({children, handleClick}: ButtonProps) => {
    return (
        <button onClick={handleClick}>{children}</button>
    );
}

