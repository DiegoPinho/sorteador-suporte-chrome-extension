var mongoose = require('mongoose');

var populador = {
	
	popularBancoComDesenvolvedores : function() {
		var Candidato = require('../models/candidato');
		Candidato.find({}, function(err, candidatos) {
			if(candidatos.length === 0){
				var index;
				for(index in populador.equipinho){
					var dev = populador.equipinho[index];
					var candidato = new Candidato();
					candidato.nome = dev.nome;
					candidato.urlFoto = dev.urlFoto;
					candidato.atendeuSuporte = false;
					candidato.save(function(err) {
						if(err) throw err;
						return;
					})
				}
			}
		});
	},

	equipinho : [
		{'nome': 'Pinho', 'urlFoto': 'faces/pinho.png'}, 
		{'nome': 'Telles','urlFoto': 'faces/telles.png'},
		{'nome': 'Christian','urlFoto': 'faces/christian.png'},
		{'nome': 'Maua','urlFoto': 'faces/maua.png'},
		{'nome': 'Diogo','urlFoto': 'faces/diogo.png'}
	]
};

module.exports = populador;
