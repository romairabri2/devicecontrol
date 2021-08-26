import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
//import Moment from "react-moment";
import 'moment/locale/es';
import swal from 'sweetalert';

class Devices extends Component {

    url = Global.url;

    state = {
        devices: [],
        status: null
    };

    componentDidMount() {
        var search = this.props.search;
             
        this.getLastDevices();
        if (search && search !== null && search !== undefined) {
            this.getDevicesBySearch(search);
        } 
    }

    getDevicesBySearch = (searched) => {
        axios.get(`${this.url}search/${searched}`)
            .then(res => {
                this.setState({
                    devices: res.data.devices,
                    status: 'success'
                });
            })
            .catch(err => {
                this.setState({
                    devices: {},
                    status: 'success'
                });
            });
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

    getDevices = () => {
        axios.get(`${this.url}devices`)
            .then(res => {
                this.setState({
                    devices: res.data.devices,
                    status: 'success'
                })
            });
    }

    
    deleteDevice = (id) => {

        swal({
            title: "Estas seguro?",
            text: "Borrarás permanentemente tu dispositivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })

        axios.delete(this.url + 'device/' + id)
            .then( res => {
                this.setState(
                    {
                        device: res.data.device,
                        status: 'success'
                    });

                    swal(
                        'Dispositivo borrado',
                        'El dispositivo ha sido borrado correctamente',
                        'success'
                    );             
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
                        <td>{device.type}</td>
                        <td><Link to={'/device/edit/' + device._id}>{device.label}</Link></td>
                        <td>{device.manufacturer}</td> 
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
                                <th>Type</th>
                                <th>Label</th>
                                <th>Manufacturer</th>
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

export default Devices;