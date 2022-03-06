import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deauthorize } from "../redux/user";
import { useHistory } from "react-router-dom";

import SettingsAccountDetails from "../components/settings/SettingsAccountDetails";
import SettingsSubscription from "../components/settings/SettingsSubscription";
import SettingsManageCharts from "../components/settings/SettingsManageCharts";
import SettingsToS from "../components/settings/SettingsToS";

function Settings(){
    const dispatch = useDispatch();
    const history = useHistory();

    const [currentPage, setCurrentPage] = useState("Account Details");

    const renderTab = () => {
        switch(currentPage){
            case "Account Details":
                return <SettingsAccountDetails/>;
            case "Subscription":
                return <SettingsSubscription/>;
            case "Manage Charts":
                return <SettingsManageCharts/>;
            case "Terms of Service":
                return <SettingsToS/>;
            default:
                return <SettingsAccountDetails/>;
        }
    }

    const onClickTab = (tab) => {
        setCurrentPage(tab);
    }

    const onClickLogout = () => {
        dispatch(deauthorize());
        history.push("/");
    }

    return(
        <div className="d-flex align-items-stretch settings-page-container">
            <ul className="nav flex-column settings-tab-container">
                <li className={currentPage === "Account Details" ? "settings-tab-selected" : ""} onClick={() => onClickTab("Account Details")}>Account Details</li>
                <li className={currentPage === "Subscription" ? "settings-tab-selected" : ""} onClick={() => onClickTab("Subscription")}>Subscription</li>
                <li className={currentPage === "Manage Charts" ? "settings-tab-selected" : ""} onClick={() => onClickTab("Manage Charts")}>Manage Charts</li>
                <li className={currentPage === "Terms of Service" ? "settings-tab-selected" : ""} onClick={() => onClickTab("Terms of Service")}>Terms of Service</li>
                <li style={{color: "#DC3545"}} onClick={() => onClickLogout()}>Logout</li>
            </ul>
            {renderTab()}
        </div>
    )
}

export default Settings;