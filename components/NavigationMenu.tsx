"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";
import { tv, type VariantProps } from "tailwind-variants";
import { RiArrowDownSLine } from "@remixicon/react";
import { cx } from "@/lib/utils";
import Link from "next/link";

const navigationMenu = tv({
    base: "flex flex-col",
    variants: {
        spacing: {
            tight: "space-y-2",
            loose: "space-y-4",
        },
        responsive: {
            sm: {
                root: "flex flex-col sm:flex-row",
                item: "sm:text-lg",
            },
            md: {
                root: "flex flex-col md:flex-row",
                item: "md:text-lg",
            },
            lg: {
                root: "flex flex-col lg:flex-row",
                item: "lg:text-lg",
            },
        },
    },
    slots: {
        root: "bg-white shadow-md list-none",
        item: " p-2 relative",
        subItem: "text-lg font-bold",
        subMenu: "bg-gray-100 text-sm my-2 shadow-md",
        trigger: "text-lg font-bold",
        content: "absolute top- left-0 pl-2 w-96",
    },
});

type NavigationMenuVariants = VariantProps<typeof navigationMenu>;

type MenuItem = {
  label: string;
  href: string;
};

type SubmenuWithMenuItems = {
  label: string;
  subMenus: MenuItem[];
};

type Menu = (MenuItem | SubmenuWithMenuItems)[];

interface NavigationMenuProps extends NavigationMenuVariants {
    menus: Menu;
}

interface NextLinkProps {
    href: string;
    children: React.ReactNode;
}

const NextLink = ({ href, ...props }: NextLinkProps) => {
    const pathname = usePathname();
    const isActive = href === pathname;

    return (
        <NavigationMenu.Link asChild active={isActive}>
            <Link href={href} {...props} />
        </NavigationMenu.Link>
    );
};

const NavigationMenuComponent: React.FC<NavigationMenuProps> = ({ menus }) => {
    const { root, item, content, subMenu, subItem, trigger } = navigationMenu();

    return (
        <NavigationMenu.Root
            className={cx(root({ responsive: "md", spacing: "tight" }))}
        >
            {menus.map((menu, index) => (
                <NavigationMenu.Item className={cx(item())} key={index}>
                    {'subMenus' in menu ? 
                     (
                        <>
                            <NavigationMenu.Trigger
                                className={cx(trigger())}
                            >
                                {menu.label} <RiArrowDownSLine className="h-4 inline" />
                            </NavigationMenu.Trigger>
                            <NavigationMenu.Content
                                className={cx(content())}
                            >
                                <NavigationMenu.Sub className={cx(subMenu())}>
                                    <NavigationMenu.List>
                                        {menu.subMenus.map(
                                            (subMenu, subIndex) => (
                                                <NavigationMenu.Item
                                                    key={subIndex}
                                                    className={cx(subItem())}
                                                >
                                                    <NextLink
                                                        href={subMenu.href}
                                                    >
                                                        {subMenu.label}
                                                    </NextLink>
                                                </NavigationMenu.Item>
                                            )
                                        )}
                                    </NavigationMenu.List>
                                </NavigationMenu.Sub>
                            </NavigationMenu.Content>
                        </>
                    ) : <NextLink href={menu.href}>{menu.label}</NextLink>}
                </NavigationMenu.Item>
            ))}
        </NavigationMenu.Root>
    );
};

export default NavigationMenuComponent;
