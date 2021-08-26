import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

class EditDevice extends Component {

    url = Global.url;

    deviceId = null;
    device_status_turnedOn = "";
    device_status_speed = "";

    typeRef = React.createRef();
    labelRef = React.createRef();
    manufacturerRef = React.createRef();

    state = {
        device: {},
        status: null,
        selectedFile: null
    };

    deviceId = this.props.match.params.id;

    componentDidMount() {
        this.getDevice(this.deviceId);
    }

    validator = new SimpleReactValidator({
        messages: {
            required: 'Este campo es requerido'
        }
    });

    getDevice = (Id) => {
       axios.get(this.url + 'device/' + Id)
            .then(res => {
                this.setState(
                    {
                        device: res.data.device
                    })
            }).catch(err => {
                this.setState({
                    devices: {}
                });
            });
    }

    deleteDevice = (id) => {

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

    changeState = (e) => {
        var device2 = {};
        
        if(this.state.device.type === "fan"){

            if(this.state.device.state.turnedOn === "true" || this.state.device.state.turnedOn === "false")
            this.device_status_turnedOn = this.state.device.state.turnedOn;

            if(this.state.device.state.speed !== "" && this.state.device.state.speed !== undefined)
            this.device_status_speed = this.state.device.state.speed;

            device2 = {
                type: this.state.device.type,
                label: this.labelRef.current.value,
                manufacturer: this.manufacturerRef.current.value,
                state : {
                    turnedOn: this.device_status_turnedOn,
                    speed: this.device_status_speed
                }
            };
        }
        else{

            if(this.state.device.state.turnedOn === "true" || this.state.device.state.turnedOn === "false")
            this.device_status_turnedOn = this.state.device.state.turnedOn;

            device2 = {
                type: this.state.device.type,
                label: this.labelRef.current.value,
                manufacturer: this.manufacturerRef.current.value,
                state : {
                    turnedOn: this.device_status_turnedOn
                }
            };
            console.log(device2);
        }

        this.setState({
            device: device2
        });
        
        this.validator.showMessages();
        this.forceUpdate();
    }

    saveDevice = (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {

            axios.put(`${this.url}device/${this.deviceId}`, this.state.device)
                .then(res => {
                    if (res.data.device) {
                        this.setState({
                            device: res.data.device,
                            status: 'waiting'
                        });

                        swal(
                            'Dispositivo editado',
                            'El dispositivo ha sido editado correctamente',
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
        } else {

            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    render() {

        if (this.state.status === 'success') {
            return <Redirect to="/home" />;
        };

        if (this.state.device.type) {
            var type = this.state.device.type;
        }  

        var device = this.state.device;
        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Edit Device</h1>

                    {this.state.device.type &&
                        <div id="article-data">
                            <p>Tipo: <strong>{type}</strong></p>
                        </div>
                    }


                    {/*Mostrar Datos del Formulario*/}
                    {this.state.device.type &&

                        <form className="mid-form" onSubmit={this.saveDevice} onChange={this.changeState}>
                            
                            <div className="form-group">
                                <label htmlFor="label">Label</label>
                                <input type="text" name="label" defaultValue={device.label} ref={this.labelRef}></input>
                                {this.validator.message('label', this.state.device.label, 'required|min:2|max:400|alpha_num_space')}
                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Manufacturer</label>
                                <input type="text" name="manufacturer" defaultValue={device.manufacturer} ref={this.manufacturerRef}></input>
                                {this.validator.message('manufacturer', this.state.device.manufacturer, 'required|min:2|max:400|alpha_num_space')}
                            </div>
            
                           
                            <input type="submit" value="Save" className="btn btn-success" />

                            <div className="form-group">
                            <button onClick={
                                () => {
                                    this.deleteDevice(device._id)
                                }
                            }
                                className="btn btn-danger">Delete</button>

                            </div>
                        </form>
  
                    }
                    {!this.state.device.type &&
                        <h1 className="subheader">Cargando...</h1>
                    }



                </section>
            </div>
        );
    }
}

export default EditDevice;