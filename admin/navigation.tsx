import {
  NavigationContainer,
  NavItem,
  ListNavItems,
} from "@keystone-6/core/admin-ui/components";
import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import React from "react";

export function Navigation({ authenticatedItem, lists }: NavigationProps) {
  React.useEffect(() => {
    document.title = "NextKS";
  }, []);
  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      <NavItem href="/custom">Custom</NavItem>
    </NavigationContainer>
  );
}
