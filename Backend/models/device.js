'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = Schema({
    type: String,
    label: String,
    manufacturer: String,
    state: Object
});

module.exports = mongoose.model('Device', DeviceSchema);
//device--> Guarda documentos de este tipo y con estructura dentro de la coleccion
