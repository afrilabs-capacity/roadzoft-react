import React from "react";
import * as Icon from "react-feather";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: <MdIcons.MdPieChart />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Projects",
    path: "/projects",
    icon: <MdIcons.MdOutlineWork />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <MdIcons.MdLightbulb />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Users",
    path: "#",
    icon: <MdIcons.MdSupervisorAccount />,
    frontIcon: <MdIcons.MdChevronRight />,
    classname: "nav-item",
    classname2: "nav-item2",
    sub: [
      {
        title: "All Users",
        path: "/users",
        icon: <MdIcons.MdSupervisorAccount />,
        classname: "nav-item",
        classname2: "nav-item2",
      },
      {
        title: "Inquiries",
        path: "/inquiries",
        icon: <MdIcons.MdHelpCenter />,
        classname: "nav-item",
        classname2: "nav-item2",
      },
      {
        title: "Logs",
        path: "/log",
        icon: <MdIcons.MdBook />,
        classname: "nav-item",
        classname2: "nav-item2",
      },
    ],
  },
  // {
  //   title: "Supervisor",
  //   path: "#",
  //   icon: <MdIcons.MdSupervisorAccount />,
  //   frontIcon: <MdIcons.MdChevronRight />,
  //   classname: "nav-item",
  //   classname2: "nav-item2",
  //   sub: [
  //     {
  //       title: "Reports",
  //       path: "/users",
  //       icon: <MdIcons.MdSupervisorAccount />,
  //       classname: "nav-item",
  //       classname2: "nav-item2",
  //     },
  //   ],
  // },
  {
    title: "Messages",
    path: "/messages",
    icon: <MdIcons.MdChat />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
];

export const SupervisorSidebarData = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: <MdIcons.MdPieChart />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <MdIcons.MdLightbulb />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
];

export const CitizenSidebarData = [
  {
    title: "Overview",
    path: "/citizen/dashboard",
    icon: <MdIcons.MdPieChart />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Projects",
    path: "/citizen/projects",
    icon: <MdIcons.MdOutlineWork />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Reports",
    path: "/citizen/reports",
    icon: <MdIcons.MdLightbulb />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Users",
    path: "#",
    icon: <MdIcons.MdSupervisorAccount />,
    frontIcon: <MdIcons.MdChevronRight />,
    classname: "nav-item",
    classname2: "nav-item2",
    sub: [
      {
        title: "All Users",
        path: "/citizen/users",
        icon: <MdIcons.MdSupervisorAccount />,
        classname: "nav-item",
        classname2: "nav-item2",
      },
      {
        title: "Inquiries",
        path: "/citizen/inquiries",
        icon: <MdIcons.MdHelpCenter />,
        classname: "nav-item",
        classname2: "nav-item2",
      },
      {
        title: "Logs",
        path: "/citizen/log",
        icon: <MdIcons.MdBook />,
        classname: "nav-item",
        classname2: "nav-item2",
      },
    ],
  },
  {
    title: "Messages",
    path: "/citizen/messages",
    icon: <MdIcons.MdChat />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
];

export const BottomSeidebarData = [
  {
    title: "Settings",
    path: "/settings",
    icon: <MdIcons.MdSettings />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <MdIcons.MdNotifications />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
];

export const CitizenBottomSeidebarData = [
  {
    title: "Settings",
    path: "/citizen/settings",
    icon: <MdIcons.MdSettings />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
  {
    title: "Notifications",
    path: "/citizen/notifications",
    icon: <MdIcons.MdNotifications />,
    classname: "nav-item",
    classname2: "nav-item2",
  },
];
