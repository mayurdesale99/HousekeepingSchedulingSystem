import React, { useState } from "react";
import "./navbar.css";

const Sidebar = () => {
  const [adminStatus, setAdminStatus] = useState(true);
  function login() {
    setAdminStatus(!adminStatus);
  }
  return (
    <div>
      <div className="header">
        <h6 className="logo">HomeCare Pro</h6>
        <h1 className="textheader">Welcome Admin</h1>
      </div>
      <div className="sidebar ">
        <div className="sidebar-item ">
          <i class="bi bi-tv"></i>
          Dashboard
        </div>
        {!adminStatus && (
          <div>
            <div className="sidebar-item ">
              <i class="bi bi-telegram"></i>My Requests
            </div>
            <div className="sidebar-item ">
              <i class="bi bi-joystick"></i>Status
            </div>
            <div className="sidebar-item ">
              <i class="bi bi-person-circle"></i>Profile
            </div>
            <div className="sidebar-item ">
              <i class="bi bi-card-checklist"></i>Feedback
            </div>
          </div>
        )}
        {adminStatus && (
          <div>
            <div className="sidebar-item ">
              <i class="bi bi-telegram"></i>Requests
            </div>
            <div className="sidebar-item ">
              <i class="bi bi-person-circle"></i>Housekeeprs
            </div>
            <div className="sidebar-item ">
              <i class="bi bi-person-bounding-box"></i>Students
            </div>
            <div className="sidebar-item ">
              <i class="bi bi-card-checklist"></i>Feedbacks
            </div>
          </div>
        )}
        <div className="sidebar-item " onClick={login}>
          <i class="bi bi-box-arrow-left"></i>Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
