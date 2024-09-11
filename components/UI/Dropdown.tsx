"use client";
import { useState } from "react";

interface DropdownProps {
  trigger: string;
  triggerClasses?: string;
  dropTargetClasses?: string;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* <div className={`w-48 ${ isOpen ? "h-20": "" }`}> */}
      <div>
          <button className={`mb-2 ${props.triggerClasses}`} onClick={() => setIsOpen(!isOpen)}>{props.trigger} { isOpen ? " 🡹":" 🡻" }</button>
          <br />
          <div className={`${props.dropTargetClasses}`}>{ isOpen && props.children }</div>
      </div>
    </>
  );
};

export default Dropdown;
