import React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cx } from "@/lib/utils"; // Import the cx utility

const variants = {
  list: "flex flex-row space-x-4 p-4 bg-gray-100", // Horizontal list (header)
  group: "relative", // Important for the relative positioning of the sub-menu
  item: "absolute left-0 top-full mt-2 bg-white shadow-lg p-2 rounded-md flex flex-col space-y-2 w-max", // Aligns the dropdown just below the trigger
  link: "text-gray-900 hover:text-blue-600 px-4 py-2 transition-colors", // Link styling with hover effect
  trigger: "px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md", // Trigger styling for the dropdown
};


// Main Navigation Menu Component
const NavigationMenuComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={cx(variants.list)}>
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

// Group Component
const NavigationMenuGroupComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationMenu.Item className={cx(variants.group)}>
      <NavigationMenu.Trigger className={cx(variants.trigger)}>{children}</NavigationMenu.Trigger>
      <NavigationMenu.Content className={cx(variants.item)}>
        
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

// Link Component
const NavigationMenuLinkComponent = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <NavigationMenu.Link href={href} className={cx(variants.link)}>
      {children}
    </NavigationMenu.Link>
  );
};

// Trigger Component (dropdown)
const NavigationMenuTriggerComponent = ({ children }: { children: React.ReactNode }) => {
  return (
      <NavigationMenu.Trigger asChild>
        <div className={cx(variants.trigger)}>
          {children}
          <span className="ml-2">▼</span> {/* Dropdown icon */}
        </div>
    </NavigationMenu.Trigger>
  );
};

// Content Component
const NavigationMenuContentComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavigationMenu.Content className={cx(variants.item)}>
      {children}
    </NavigationMenu.Content>
  );
};

export {
  NavigationMenuComponent,
  NavigationMenuGroupComponent,
  NavigationMenuLinkComponent,
  NavigationMenuTriggerComponent,
  NavigationMenuContentComponent,
};

























// import * as NavigationMenu from "@radix-ui/react-navigation-menu";
// import { cx } from "@/lib/utils"; // Your custom cx function

// // Tailwind Variants
// const NavigationMenuComponent = () => {
//   const variants = {
//     list: {
//        base: "flex flex-col space-y-2",
//     },
//     item: {
//        base: "flex items-center space-x-4",
//     },
//     trigger: {
//        base: "text-gray-900 hover:text-gray-700 py-2 px-4 rounded",
//     },
//     link: {
//        base: "text-gray-900 hover:text-gray-700 block py-2 px-4 rounded",
//     },
//   };
//   return (
//     <NavigationMenu.Root>
//       <NavigationMenu.List className={cx(variants.list.base)}>
//         <NavigationMenu.Item className={cx(variants.item.base)}>
//           <NavigationMenu.Trigger className={cx(variants.trigger.base)}>
//             Events
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content>
//             <NavigationMenu.Link className={cx(variants.link.base)} href="/music-concerts">
//               Music Concerts
//             </NavigationMenu.Link>
//             <NavigationMenu.Link className={cx(variants.link.base)} href="/standup-comedy">
//               Standup Comedy
//             </NavigationMenu.Link>
//             <NavigationMenu.Link className={cx(variants.link.base)}>
//               Love Proposal
//             </NavigationMenu.Link>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className={cx(variants.item.base)}>
//           <NavigationMenu.Trigger className={cx(variants.trigger.base)}>
//             Workshops
//           </NavigationMenu.Trigger>
//           <NavigationMenu.Content>
//             <NavigationMenu.Link className={cx(variants.link.base)} href="/masterclass">
//               Masterclass
//             </NavigationMenu.Link>
//             <NavigationMenu.Link className={cx(variants.link.base)} href="/workshop">
//               Workshops
//             </NavigationMenu.Link>
//           </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         <NavigationMenu.Item className={cx(variants.item.base)}>
//             <NavigationMenu.Trigger className={cx(variants.trigger.base)}>
//                   Live
//             </NavigationMenu.Trigger>
//             <NavigationMenu.Content>
//                 <NavigationMenu.Link className={cx(variants.link.base)}>
//                     T20 IPL
//                 </NavigationMenu.Link>
//                 <NavigationMenu.Link className={cx(variants.link.base)}>
//                     Golf
//                 </NavigationMenu.Link>
//             </NavigationMenu.Content>
//         </NavigationMenu.Item>

//         {/* Add more items as needed */}
//       </NavigationMenu.List>

//       <NavigationMenu.Viewport />
//     </NavigationMenu.Root>
//   );
// };

// export default NavigationMenuComponent;







