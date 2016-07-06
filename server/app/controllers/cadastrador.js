var mongoose = require('mongoose');
var Candidato = require('../models/candidato');

var cadastrador = {

	cadastrar : function(dados, callback) {
		var novo = new Candidato();
		novo.nome = dados.nome;
		novo.urlFoto = dados.urlFoto;
		novo.atendeuSuporte = false;
		novo.email = dados.email;
		novo.slack = dados.slack;

		novo.save(function(err) {
			if(err) throw err;
			return callback();
		});
	},

	recuperarTodosCadastrados(callback){
		Candidato.find({}, function(err, candidatos) {
			callback(candidatos);
		});
	}

};

module.exports = cadastrador;
