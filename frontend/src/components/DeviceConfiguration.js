import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import 'moment/locale/es';

class DeviceConfiguration extends Component {
    url = Global.url;

     state = {
        devices: [],
        status: null,
    };    

    componentDidMount() {
      
        this.getLastDevices();
      
    }

    getLastDevices = () => {
        axios.get(`${this.url}devices/last`)
            .then(res => {
                this.setState({
                    devices: res.data.devices,
                    status: 'success'
                })
            });
    }

    render() {

       if (this.state.status === 'deleted') {
            return <Redirect to="/home" />
        }

        if (this.state.devices.length >= 1 && (this.state.status === "success" || this.state.status === "deleted" )) {
            var listDevices = this.state.devices.map((device) => {
                return (    
                    <tr key={device._id}>
                        <td><Link to={'/config/device/' + device._id}>{device.label}</Link></td>
                        <td>{device.type}</td>
                        <td>
                        {
                            device.type === "fan" ? (
                                <div>
                                    <p>Speed: {device.state.speed} </p>
                                    <p>TurnOn: {device.state.turnedOn}</p>
                                </div>
                            ) : (
                                <p>TurnOn: {device.state.turnedOn} </p>
                            )
                        }
                        </td>                        
                    </tr>         
                );
            });

            return (
                <div id="articles">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="5">Available Devices</th>
                            </tr>
                            <tr>
                                <th>Label</th>
                                <th>Type</th>
                                <th>Configuration</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {listDevices}
                        </tbody>
                    </table>
                </div>
            );
        } else if (this.state.devices.length === 0 && this.state.status === "success") {
            return (
                <div id="articles">
                    <h2 className="subheader">No hay dispositivos para mostrar</h2>
                    <p>Todavía no hay dispositivos en esta sección</p>
                </div>

            );
        } else {
            return (
                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>Espere mientras carga el contenido</p>
                </div>

            );
        }
    }
}

export default DeviceConfiguration;