var mongoose = require('mongoose');
var Candidato = require('../models/candidato');

var sorteador = {

    sortear : function(callback) {
        var candidato = null;
        sortearCandidatos(function(candidatos){
            var numeroCandidatos = candidatos.length;
            if(numeroCandidatos > 0){
                var numeroAleatorio = sortearNumeroAleatorio(0, numeroCandidatos - 1);
                candidato = candidatos[numeroAleatorio];
                callback(candidato);
            } else {
                zerarStatusAtendimento(callback);
            }
        })
    },

    confirmar : function(nome, callback) {
        var query = {'nome' : nome};
        Candidato.update(query, {$set : {'atendeuSuporte' : true}}, {}, function(err) {
            if(err) throw err;
            else callback();
        })
    }

};

function sortearCandidatos(callback) {
    var query = {'atendeuSuporte':false};
    Candidato.find(query, function(err, candidatos){
        if(err) console.log('deu alguma merda');
        callback(candidatos);
    });
}

function zerarStatusAtendimento(callback) {
    Candidato.update({}, {'$set' : {'atendeuSuporte' : false}}, {multi:true}, function(err){
        if(err) throw err;
        else sorteador.sortear(callback);
    });
}


function sortearNumeroAleatorio(min,max){
    return Math.round(Math.random() * (max-min) + min);
}

module.exports = sorteador;
