var request = require('request');
var mongoose = require('mongoose');
var Candidato = require('../models/candidato');

var headers = {
    // 'User-Agent':       'Super Agent/0.0.1',
    "Content-type": "application/json"
    // "Content-type":     "application/x-www-form-urlencoded"
}

var slackNotifier = {
    enviarNotificacao : function(usuarioDefault, slackUrl, usuarioNotificado, callback) {
        var options = {
            url: slackUrl,
            method: 'POST',
            headers: headers,
            form: JSON.stringify({
                "username": usuarioDefault,
                "link_names": 1,
                "text": usuarioNotificado + ": Você acaba de ser sortedo para resolver uma SUP"
                // "icon":"", -> Se quiser pode usar esse param. para colocar icone do BOT do slack ou alterar direto na pag do slack
            })
        };

        enviarRequestNotificacaoSlack(options, usuarioNotificado, callback);
    }

};

module.exports = slackNotifier;

function enviarRequestNotificacaoSlack(options, slack, callback) {
    //TODO: Ajustar o texto para enviar no slack
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            callback();
        } else console.log('Ocorreu um erro terrível!' + error);
    })
};
