var mongoose = require('mongoose');

var schemaSorteio = mongoose.Schema({
    sorteado: String,
    data: String,
});

module.exports = mongoose.model('Sorteio', schemaSorteio);
