import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data Swipe
  const [isDashboard, setIsDashboard] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isUserManagement, setIsUserManagement] = useState(false);
  const [isListingManagement, setIsListingManagement] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Key") {
      setIsSetting(false);
    }
    if (iscurrentState !== "KeyGroups") {
      setIsUserManagement(false);
    }
    if (iscurrentState !== "Requests") {
      setIsListingManagement(false);
    }
  }, [
    history,
    iscurrentState,
    isSetting,
    isDashboard,
    isUserManagement,
    isListingManagement,
  ]);

  const menuItems = [
    //All New Code
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboards",
      icon: "ri-dashboard-line",
      link: "/dashboard",
      stateVariables: isDashboard,
      click: function (e) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Dashboard");
        updateIconSidebar(e);
      },
    },
    {
      id: "listingManagement",
      label: "Listing Management",
      icon: "ri-dashboard-line",
      link: "/listing-management",
      stateVariables: isListingManagement,
      click: function (e) {
        e.preventDefault();
        setIsListingManagement(!isListingManagement);
        setIscurrentState("ListingManagement");
        updateIconSidebar(e);
      },
      // subItems: [
      //   {
      //     id: "allKeyGroups",
      //     label: "All Key Chains",
      //     link: "/all-keygroups",
      //     parentId: "listingManagement",
      //   },
      //   {
      //     id: "add-keygroup",
      //     label: "Add Key Chain",
      //     link: "/add-keygroup",
      //     parentId: "listingManagement",
      //   },
      // ],
    },
    {
      id: "UserManagement",
      label: "User Management",
      icon: "ri-dashboard-line",
      link: "/user-management",
      stateVariables: isUserManagement,
      click: function (e) {
        e.preventDefault();
        setIsUserManagement(!isUserManagement);
        setIscurrentState("UserManagement");
        updateIconSidebar(e);
      },
    },
    {
      id: "setting",
      label: "Settings",
      icon: "ri-dashboard-line",
      link: "/settings",
      stateVariables: isSetting,
      click: function (e) {
        e.preventDefault();
        setIsSetting(!isSetting);
        setIscurrentState("Setting");
        updateIconSidebar(e);
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
