import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deauthorize } from "../../redux/user";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SettingsAccountDetails(){
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [newEmail, setNewEmail] = useState("");
    const [confirmNewEmail, setConfirmNewEmail] = useState("");
    const [newEmailPassword, setNewEmailPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");

    const clearAllFields = () => {
        setNewEmail("");
        setConfirmNewEmail("");
        setNewEmailPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setOldPassword("");
    }

    const onChangeEmail = () => {
        if(!newEmail.length || newEmail !== confirmNewEmail)
            alert("Invalid new email field(s)");
        else{
            axios.post("/api/user/change-email",
                    {
                        newEmail: newEmail,
                        password: newEmailPassword
                    },
                    { headers: { "Authorization": "Bearer " + state.user.token } })
                .then((res) => {
                    alert("Success. Please verify your new email address")
                    dispatch(deauthorize());
                    history.push("/");
                })
                .catch((e) => {
                    if(e.response.data.message)
                        alert(e.response.data.message);
                    else
                        alert("Error: Please try again later");
                })
        }
        clearAllFields();
    }

    const onChangePassword = () => {
        if(newPassword.length < 8 || newPassword.length > 128)
            alert("Password must be between 8 and 128 characters long");
        else if(newEmail !== confirmNewEmail)
            alert("Passwords do not match)");
        else{
            axios.post("/api/user/change-password",
                    {
                        newEmail: newPassword,
                        password: oldPassword
                    },
                    { headers: { "Authorization": "Bearer " + state.user.token } })
                .then((res) => {
                    alert("Success")
                })
                .catch((e) => {
                    if(e.response.data.message)
                        alert(e.response.data.message);
                    else
                        alert("Error: Please try again later");
                })
        }
        clearAllFields();
    }

    return(
        <div className="settings-subpage-container">
            <h2 className="settings-subpage-header"> Account Details</h2>
            <div className="settings-ad-container">
                <div className="settings-ad-sub-container">
                    <span>Email:</span><span className="settings-ad-user-info">{" " + state.user.email}</span>
                    <div className="settings-ad-form-container">
                        <Form className="form-group">
                            <FormControl className="form-item settings-ad-form-item" type="email" placeholder="New Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="email" placeholder="Confirm New Email" value={confirmNewEmail} onChange={(e) => setConfirmNewEmail(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="Password" value={newEmailPassword} onChange={(e) => setNewEmailPassword(e.target.value)}/>
                            <Button className="form-item settings-ad-form-item" variant="danger" onClick={() => onChangeEmail()}>Change Email</Button>
                        </Form>
                    </div>
                </div>
                <div className="settings-ad-sub-container">
                    <span>Change password</span>
                    <div className="settings-ad-form-container">
                        <Form className="form-group">
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}/>
                            <FormControl className="form-item settings-ad-form-item" type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}/>
                            <Button className="form-item settings-ad-form-item" variant="danger" onClick={() => onChangePassword()}>Change Password</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsAccountDetails;