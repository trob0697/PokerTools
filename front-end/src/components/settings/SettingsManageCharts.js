import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deauthorize } from "../../redux/user";
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";

function SettingsManageCharts(){
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();

    const [charts, setCharts] = useState([]);
    const [chartUploading, setChartUploading] = useState(false)

    useEffect(() => {
        axios.get("/api/preflop-charts/users-charts", 
                { headers: {"Authorization": "Bearer " + state.user.token} }
            )
            .then((res) => {
                const resCharts = []
                res.data.forEach((item) => resCharts.push(item.name));
                setCharts(resCharts)
            })
            .catch((e) => {
                if(e.response.status === 401){
                    alert("Unauthorized");
                    dispatch(deauthorize());
                    history.push("/");
                }
            })
    });

    const removeChart = async (index) => {
        confirmAlert({
            message: 'Are you sure to do this?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    axios.delete("/api/preflop-charts/delete-chart", 
                            { headers: {"Authorization": "Bearer " + state.user.token} },
                            { data: { name: charts[index] } }
                        )
                        .then((res) =>{
                            let tempCharts = [...charts];
                            tempCharts.splice(index, 1);
                            setCharts(tempCharts);
                        })
                        .catch((e) => {
                            alert(e.response.data.message);
                        })
                }
              },
              {
                label: 'No',
                onClick: () => { }
              }
            ]
          });
    }

    const uploadChart = () => {
        setChartUploading(true);
        setTimeout(() => {console.log("sleep")}, 5000)
        setChartUploading(false);
    }

    return(
        <div className="settings-subpage-container">
            <h2 className="settings-subpage-header">Manage Charts</h2>
            <div className="settings-mc-container">
                <div>
                    <ul className="list-group" style={{alignItems: "center"}}>
                    {charts.length ? 
                    charts.map((item, index) => { return (
                        <li className="list-group-item settings-mc-chart-item" key={index} ><span>{item}</span><span className="settings-mc-chart-item-delete" onClick={() => removeChart(index)}>&times;</span></li>
                    )})
                    :
                        <li className="list-group-item settings-mc-chart-item" style={{textAlign: "center"}}>No Charts Available</li>
                    }
                    </ul>
                    <div className="settings-mc-chart-tip">Maximum 5 Charts</div>
                </div>
                <div className="settings-mc-upload-chart">
                    <input className="settings-mc-upload-chart-item" type="file" directory="" webkitdirectory="" style={{width: "40vw"}}/>
                    <Button className="form-item settings-mc-upload-chart-item" variant="danger" disabled={charts.length >= 5} onClick={() => uploadChart()}>
                    {chartUploading ? 
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        :
                        "Upload"
                    }
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default SettingsManageCharts;