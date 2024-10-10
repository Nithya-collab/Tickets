
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { cx } from "@/lib/utils"; // Your custom cx function
// Tailwind Variants

const NavigationMenuComponent = () => {
  const variants = {
    list: {
      base: "flex flex-col space-y-2",
    },
    item: {
      base: "flex items-center space-x-4",
    },
    trigger: {
      base: "text-gray-900 hover:text-gray-700 py-2 px-4 rounded",
    },
    link: {
      base: "text-gray-900 hover:text-gray-700 block py-2 px-4 rounded",
    },
  };
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List className={cx(variants.list.base)}>
        <NavigationMenu.Item className={cx(variants.item.base)}>
          <NavigationMenu.Trigger className={cx(variants.trigger.base)}>
            Events
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link className={cx(variants.link.base)} href="/music-concerts">
              Music Concerts
            </NavigationMenu.Link>
            <NavigationMenu.Link className={cx(variants.link.base)} href="/standup-comedy">
              Standup Comedy
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item className={cx(variants.item.base)}>
          <NavigationMenu.Trigger className={cx(variants.trigger.base)}>
            Workshops
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <NavigationMenu.Link className={cx(variants.link.base)} href="/masterclass">
              Masterclass
            </NavigationMenu.Link>
            <NavigationMenu.Link className={cx(variants.link.base)} href="/workshop">
              Workshops
            </NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Add more items as needed */}
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
};

export default NavigationMenuComponent;
