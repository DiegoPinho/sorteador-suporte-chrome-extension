var mongoose = require('mongoose');

var schemaUsuario = mongoose.Schema({
    nome: String,
    urlFoto: String,
    email: String,
    atendeuSuporte: Boolean,
    slack:  String
});

module.exports = mongoose.model('Candidato', schemaUsuario);
