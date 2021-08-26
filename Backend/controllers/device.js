'use strict'

var validator = require('validator');
const device = require('../models/device');
var fs = require('fs');
var path = require('path');
var Device = require('../models/device');

function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

var controller = {
    
    save: (req, res) => {

        //Recoger parámetros por post
        var params = req.body;
        console.log('params='+params);
        
        //Validar datos (validator)
        try{
            var validator_type = !validator.isEmpty(params.type);
            var validator_label = !validator.isEmpty(params.label);
            var validator_manufacturer = !validator.isEmpty(params.manufacturer);
            var validator_state = !isObjEmpty(params.state);
            

        }catch(err){
            return res.status(500).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validator_type && validator_label && validator_manufacturer && validator_state){
            //Crear el Objeto a Guardar
            var device = new Device();

            //Asignar valores
            device.type = params.type;
            device.label = params.label;
            device.manufacturer = params.manufacturer;
            device.state = params.state;
            
            //device.image = null;

            //Guardar el dispositivo
            device.save((err, deviceStored) => {
                if(err || !deviceStored ){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El dispositivo no se ha guardado'
                    });
                }

                //Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    device: deviceStored
                });
            });
           
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos!!!'
            });
        }   
    },

    getDevices: (req, res) => {
        var query = device.find({});

        var last = req.params.last;
        if(last || last!= undefined){
            //query.limit(parseInt(last));
            query.limit(30);
        }
        
        //Find
        query.sort('-_id').exec((err, devices)=>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los dispositivos!!!'
                });
            }

            if(!devices){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar !!!'
                });
            }

            return res.status(200).send({
                    status: 'success',
                    devices
                });
        
        });      
    },

    getDevice: (req, res) => {
    
        //Recoger el Id de la url
        var deviceId = req.params.id;

        //Comprobar que existe        
        if(!deviceId || deviceId == null){
            
            return res.status(404).send({
                status: 'error',
                message: 'No hay articulo para mostrar !!!'
            });
        }

        //Buscar el dispositivo
        Device.findById(deviceId, (err, device) => {
            
            if(err || !device){
                return res.status(404).send({
                    status: 'error',
                    message: 'El dispositivo no existe !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                device
            });
        });
        //Devolverlo en Json
    },
    
    update: (req, res) => {

        //Recoger el Id del dispositivo por la url
        var deviceId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;

        console.log(params);

        //Validar datos
        try{

            var validate_type = !validator.isEmpty(params.type);
            var validate_label = !validator.isEmpty(params.label);
            var validate_manufacturer = !validator.isEmpty(params.manufacturer);
            //var validator_state = !isObjEmpty(params.state);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_type && validate_label && validate_manufacturer){
            //Find and update
            Device.findOneAndUpdate({_id: deviceId}, params, {new:true}, (err, deviceUpdated) => {

                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if(!deviceUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artículo !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    device: deviceUpdated
                });

            });
        }else{
            //Devolver respuesta
            return res.status(500).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });

        }
    },

    delete: (req, res) => {

        //Recoger el Id de la url
        var deviceId = req.params.id;

        //Find and delete
        Device.findOneAndDelete({_id: deviceId}, (err, deviceRemoved) =>{

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if(!deviceRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el dispositivo, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                message: deviceRemoved
            });
        });
    },
    
    search: (req, res) => {
        //Sacar el string a buscar
        var searchString = req.params.search;
        

        //Find or
        Device.find({ "$or": [
            { "type" : { "$regex": searchString, "$options": "i" }},
            { "label" : { "$regex": searchString, "$options": "i" }},
            { "manufacturer" : { "$regex": searchString, "$options": "i" }}
        ]})
        .sort([['date', 'descending']])
        .exec((err, devices) => {

            if(err){
                return res.status(500).send({
                    status: error,
                    message: 'Error en la petición !!!'
                });
            }

            if(!devices){
                return res.status(404).send({
                    status:'error',
                    message: 'No hay artículos que coincidan con tu busqueda !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                devices
            });
        });
    },
}; //end controller

module.exports = controller;