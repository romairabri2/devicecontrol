import React, { Component} from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import swal from 'sweetalert';

class DeviceConfig extends Component {

    url = Global.url;

    deviceId = null;

    state = {
        device: {},
        status: null,
        turnedOn: "false",
        KF_speed: 0
    };

    deviceId = this.props.match.params.id;

    componentDidMount() {
        this.getDevice(this.deviceId);
    }

    sumarSpeedKF = (e) => {

        if (this.state.KF_speed < 5) {
            this.setState({
                KF_speed: (this.state.KF_speed + 1)
            });
            console.log('this.state.KF_speed' + this.state.KF_speed);
        }
    }

    restarSpeedKF = (e) => {
        if (this.state.KF_speed > 0) {
            this.setState({
                KF_speed: (this.state.KF_speed - 1)
            });
            console.log('this.state.KF_speed' + this.state.KF_speed);
        }
    }

    FTurn = (e) => {
        if (this.state.turnedOn === "false") {
            this.setState({
                turnedOn: "true"
            });
        }
        else {
            this.setState({
                turnedOn: "false"
            });
        }
    }

    getDevice = (Id) => {

        axios.get(this.url + 'device/' + Id)
            .then(res => {
                this.setState(
                    {
                        device: res.data.device,
                        KF_speed: res.data.device.state.speed,
                        turnedOn: res.data.device.state.turnedOn

                    })
            }).catch(err => {
                this.setState({
                    device: {}
                });
            });
    }

    saveDevice = (e) => {
        //this.updatestate();
        var conf_state = {};
        var device2 = {};

        if (this.state.device.type === "fan") {
            conf_state = {
                turnedOn: this.state.turnedOn,
                speed: this.state.KF_speed
            };
        } else {
            conf_state = {
                turnedOn: this.state.turnedOn
            };
        }
        device2 = {
            type: this.state.device.type,
            label: this.state.device.label,
            manufacturer: this.state.device.manufacturer,
            state: conf_state
        };
        this.setState({
            device: device2
        });

        this.forceUpdate();

        axios.put(`${this.url}device/${this.deviceId}`, device2)
            .then(res => {
                if (res.data.device) {
                    this.setState({
                        device: res.data.device,
                        status: 'waiting'
                    });

                    swal(
                        'Dispositivo editado',
                        'La configuración del dispositivo ha sido editada correctamente',
                        'success'
                    );


                    this.setState({
                        status: 'success'
                    });

                } else {
                    this.setState({
                        status: 'failed'
                    });
                }
            });
           
    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to="/config" />;
        };

        var device = this.state.device;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Settings</h1>
                    {this.state.device.type &&
                        <table>
                            <thead>
                                <tr>
                                    <th colSpan="5">Available Devices</th>
                                </tr>
                                <tr>
                                    <th>Label</th>
                                    <th>Type</th>
                                    <th colSpan="3">Configuration</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr key={this.state.device._id}>
                                    <td>{device.label}</td>
                                    <td>{this.state.device.type}</td>
                                    <td>
                                        {
                                            this.state.device.type === "fan" ? (
                                                <div>
                                                    <p><i>New Speed: {this.state.KF_speed} </i></p>
                                                    <p><i>TurnOn: {this.state.turnedOn}</i></p>
                                                </div>
                                            ) : (
                                                <p>TurnOn: {this.state.turnedOn} </p>
                                            )

                                        }

                                    </td>
                                    <td>
                                        {
                                            this.state.device.type === "fan" ? (
                                                <div>
                                                    <p>
                                                        <input type="button" id="speed1" value="+ Speed" onClick={this.sumarSpeedKF} />
                                                        <input type="button" id="speed2" value="- Speed" onClick={this.restarSpeedKF} />
                                                    </p>
                                                    <p>
                                                        <input type="button" id="fanTurn" value="Change" onClick={this.FTurn} />
                                                    </p>

                                                </div>
                                            ) : (
                                             <p><input type="button" id="lightTurn" value="Change" onClick={this.FTurn} /></p>
                                            )

                                        }
                                    </td>
                                    <td><p><input type="button" id="lightTurn" value="Save" onClick={this.saveDevice} /></p></td>
                                </tr>
                            </tbody>
                        </table>
                    }

                    {!this.state.device.type &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>
            </div>
        );
    }
}

export default DeviceConfig;