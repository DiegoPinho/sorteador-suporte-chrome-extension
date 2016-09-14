var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// dependências internas
var sorteador = require('./app/controllers/sorteador');
var populador = require('./app/controllers/populador');
var cadastrador = require('./app/controllers/cadastrador');
var slackNotifier = require('./app/controllers/slack-notifier');

// configuração do banco
var configDB = require('./config/database.js');
mongoose.connect(configDB.url);

// configurações da aplicação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routing
app.get('/', function(req,res){
    res.sendStatus(200);
});

app.get('/sortear', function(req,res) {
    sorteador.sortear(function(sorteado){
        res.send(sorteado);
    });
});

app.get('/confirmar/:nome', function(req,res){
	sorteador.confirmar(req.params.nome, function() {
		res.sendStatus(200);
	})
});

app.post('/cadastrar', function(req,res) {
    var body = req.body;
    var dados = {
        'nome' : body.nome,
        'urlFoto' : body.urlFoto,
        'email' : body.email,
        'slack' : body.slack
    };

	cadastrador.cadastrar(dados, function() {
        res.sendStatus(200);
    });
});

app.get('/cadastrados', function(req,res) {
    cadastrador.recuperarTodosCadastrados(function(cadastrados){
        res.send(cadastrados);
    })
});

app.get('/ultimosSorteios', function(req,res) {
    sorteador.recuperarUltimosSorteios(function(sorteios) {
        res.send(sorteios);
    });
});

app.post('/enviarNotificacaoSlack', function(req,res) {
    var body = req.body;
    var usuarioDefault = body.slackDefault;
    var slackUrl = body.slackUrl;
    var slackSorteado = body.slackSorteado;

    slackNotifier.enviarNotificacao(usuarioDefault, slackUrl, slackSorteado, function(){
        res.sendStatus(200);
    });

});

var porta = process.env.PORT || 8080;
app.listen(porta);
console.log('Servidor está em pé e escutando a porta: ' + porta);

// carga inicial da aplicação
// populador.popularBancoComDesenvolvedores();
