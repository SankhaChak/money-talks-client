import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Container from "./Container";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Container className="py-4" as="nav">
      <NavigationMenu className="max-w-full w-full">
        <NavigationMenuList className="flex justify-between">
          <Link className="font-medium text-lg" href="/">
            <NavigationMenuItem>💸 MoneyTalks</NavigationMenuItem>
          </Link>
          <NavigationMenuItem className="font-medium text-lg">
            <ConnectButton />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Container>
  );
};

export default Navbar;
