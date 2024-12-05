import React from "react";
import SearchBar from "./SearchBar";
import icon from "../resources/img/user.png";
const SidebarHeader = ({ openModal, onSearch }) => {
    return (
        <div className="sidebar-header">
            <div className="sidebar-header__user-info">
                <img
                    src={icon}
                    alt="User Icon"
                    className="icon"
                />
                <button
                    className="main-button"
                    onClick={() => openModal(null)}
                >
                    New Chat
                </button>
            </div>
            <SearchBar onSearch={onSearch} />
        </div>
    );
};

export default SidebarHeader;
