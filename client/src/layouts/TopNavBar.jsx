"use client";
import { useState } from "react";
import "./topnavbar.css";
import UserMenu from "@/components/UserMenu/UserMenu";

const TopNavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="top-navbar">
      <div className="left-section">
        <img src="/assets/logo.png" alt="Logo" className="logo" />
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
      <div className="right-section">
        <div className="user-icon" onClick={toggleDropdown}>
          <img src="/assets/placeholder.svg" alt="User Icon" />
          {isDropdownOpen && (
            <div className="dropdown">
              <UserMenu
                name={"Mehak"}
                email={"b7mehak@gmail.com"}
                bio={"Working on my skills"}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
