import React, { useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

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
          <Link>
            <i class="bi bi-tv"></i>
          </Link>
          Dashboard
        </div>
        {!adminStatus && (
          <div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-telegram"></i>My Requests
              </Link>
            </div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-joystick"></i>Status
              </Link>
            </div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-person-circle"></i>Profile
              </Link>
            </div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-card-checklist"></i>Feedback
              </Link>
            </div>
          </div>
        )}
        {adminStatus && (
          <div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-telegram"></i>Requests
              </Link>
            </div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-person-circle"></i>Housekeepers
              </Link>
            </div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-person-bounding-box"></i>Students
              </Link>
            </div>
            <div className="sidebar-item ">
              <Link>
                <i class="bi bi-card-checklist"></i>Feedbacks
              </Link>
            </div>
          </div>
        )}
        <div className="sidebar-item " onClick={login}>
          <Link to="/login">
            <i class="bi bi-box-arrow-left"></i>Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
