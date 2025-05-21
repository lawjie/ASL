import React from 'react';
import { History, LayoutDashboard, Calculator, Package, List, ChartColumnIncreasing, UserCircle, Settings } from 'lucide-react';

export const pageData = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/dashboard",
  },
  {
    name: "Point of Sale",
    icon: <Calculator />,
    path: "/pointofsale",
  }, {
    name: "Item Inventory",
    icon: <Package />,
    path: "/iteminventory",
  }, {
    name: "Sales History",
    icon: <History />,
    path: "/saleshistory",

  }, {
    name: "User",
    icon: <UserCircle />,
    path: "/user",
  }, {
    name: "Settings",
    icon: <Settings />,
    path: "/settings",
  }
];
