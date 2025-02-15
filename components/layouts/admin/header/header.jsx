import SwitchTheme from "@/components/themes/switch-theme";
import { SidebarTrigger } from "@/components/ui/sidebar";
import HeaderDropdown from "./dropdown";

const Header = ({ user }) => {
  return (
    <header className="sticky top-0 z-50 flex h-14 min-h-14 w-full items-center gap-4 border-b bg-muted px-4 dark:bg-[#172031] md:h-[60px] md:min-h-[60px] md:px-6">
      <SidebarTrigger className="text-muted-foreground" />
      <SwitchTheme />
      <HeaderDropdown user={user} />
    </header>
  );
};

export default Header;
