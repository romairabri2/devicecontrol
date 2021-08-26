import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

//Validacion formularios y alertas

class CreateDevice extends Component {

    validator = new SimpleReactValidator({
        messages: {
            required: 'Este campo es requerido'
        }
    });

    url = Global.url;

    typeRef = React.createRef();
    labelRef = React.createRef();
    manufacturerRef = React.createRef();

    state = {
        device: {},
        status: null,
        selectedFile: null
    };

    changeState = (e) => {

        var conf_state = {};

        if(this.state.device.type === "fan"){
            conf_state = {
                turnedOn: "false",
                speed: 2
            };  

        }else{
            conf_state = {
                turnedOn: "false"
            };
        }

        var device = {
            type: this.typeRef.current.value,
            label: this.labelRef.current.value,
            manufacturer: this.manufacturerRef.current.value,
            state : conf_state
        };

        //console.log(device);

        this.setState({
            device: device
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveDevice = (e) => {
        e.preventDefault();

        if (this.validator.allValid()) {

            axios.post(this.url + 'save', this.state.device)
                .then(res => {
                    if (res.data.device) {
                        this.setState({
                            device: res.data.device,
                            status: 'waiting'
                        });

                        swal(
                            'Dispositivo creado',
                            'El dispositivo ha sido creado correctamente',
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

        if (this.state.device.type) {
            var type = this.state.device.type;
        }

        if (this.state.status === 'success') {
            return <Redirect to="/home" />;
        }

        return (
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Nuevo Dispositivo</h1>

                    {/*Mostrar Datos del Formulario*/}
                    {this.state.device.type &&
                        <div id="article-data">
                            <p>Tipo: <strong>{type}</strong></p>
                        </div>
                    }

                    <form className="mid-form" onSubmit={this.saveDevice} onChange={this.changeState}>
                        <div className="form-group">
                            <label htmlFor="type">Tipo</label>
                            <select  id="type" name="type" ref={this.typeRef}>
                                <option value="fan">Fan</option>
                                <option value="Light">Light</option>
                            </select>
                            
                        </div>

                        <div className="form-group">
                            <label htmlFor="label">Name</label>
                            <input type="text" name="label" ref={this.labelRef}></input>
                            {this.validator.message('label', this.state.device.label, 'required|min:3|max:400|alpha_num_space')}
                        </div>

                        <div className="form-group">
                            <label htmlFor="manufacturer">Manufacturer</label>
                            <input type="text" name="manufacturer" ref={this.manufacturerRef}></input>
                            {this.validator.message('manufacturer', this.state.device.manufacturer, 'required|min:2|max:400|alpha_num_space')}
                        </div>

                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>

                </section>
                
            </div>
        );
    }
}

export default CreateDevice;