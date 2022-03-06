import React from "react";
import { Button } from "react-bootstrap";

function SettingsSubscription(){

    const handleClick = () => {
        alert("Feature disabled!");
    }

    return(
        <div className="settings-subpage-container">
            <h2 className="settings-subpage-header">Subscription</h2>
            <div className="settings-s-container">
                <Button className="settings-subscription-button" variant="danger" onClick={() => handleClick()}>Pay/Subscribe</Button>
            </div>
        </div>
    )
}

export default SettingsSubscription;