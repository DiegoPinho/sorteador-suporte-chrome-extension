var emailSorteado = slackSorteado = nomeSorteado = "";

function sortear() {
    var foto = document.getElementById('foto');
    foto.src = '/imagens/loading.gif';
    requestUtils.getJSON('/sortear', 'GET', function(result) {
        var foto = document.getElementById('foto');
        foto.style.display = "block";
        foto.src = result.urlFoto;

        var nome = document.getElementById('nome');
        nome.value = result.nome;
        document.getElementById('nomeDoSorteado').innerHTML = "<p>Sorteado: " + result.nome + "</p>";

        var divEnvioMensagem = document.getElementById('enviarEmail');
        divEnvioMensagem.style.display = 'inline';

        if(result.slack) {
            slackSorteado = result.slack;
            document.getElementById("checkSlack").disabled = false;
        } else {
            document.getElementById("checkSlack").disabled = true;
        }

        if(result.email) {
            emailSorteado = result.email;
        }

        var botaoConfirmar = document.getElementById('botaoConfirmar');
        botaoConfirmar.style.display = "inline";
    });
}

function confirmar() {
	var nome = document.getElementById('nome').value;
	requestUtils.getJSON('/confirmar/' + nome, 'GET', function(result) {
        var checkEmail = document.getElementById('checkEmail');
        if(checkEmail.checked){
            alert("O sorteio foi confirmado! Agora você será redirecionado para enviar o e-mail");
            var queryInfo = {'active' : true };
            chrome.tabs.query(queryInfo, function(tabs) {
                var tabAtiva = tabs[0]; // aqui sabemos que voltará somente uma
                enviarEmailDeNotificacao(tabAtiva.id, tabAtiva.url, emailSorteado);
            });
        }

        mostrarImagemDeBoaSorte();
	});
}

function recuperarPropriedadesDeEmail(callback) {
    var propriedadesEmail = ['provider', 'subject', 'useTabContext'];
    chrome.storage.sync.get(propriedadesEmail, function(itens){
        return callback(itens);
    })
}

function enviarEmailDeNotificacao(tab_id, body, receiver) {
    recuperarPropriedadesDeEmail(function(itens) {
        var action_url = "mailto:" + receiver + "?";
        var subject = itens.subject;
        if (subject.length > 0) action_url += "subject=" + encodeURIComponent(subject) + "&";

        if (body.length > 0) {
            action_url += "body=" + encodeURIComponent(body);

            // Append the current selection to the end of the text message.
            /*
            if (selection.length > 0) {
                action_url += encodeURIComponent("\n\n") +
                encodeURIComponent(selection);
            }
            */
        }

        var default_handler = false; //TODO: modificar quando der suporte a mais providers
        if (!default_handler) {
            var custom_url = itens.provider;
            action_url = custom_url.replace("%s", encodeURIComponent(action_url));
            console.log('Custom url: ' + action_url);
            chrome.tabs.create({ url: action_url });
        } else {
            console.log('Action url: ' + action_url);
            chrome.tabs.update(tab_id, { url: action_url });
        }
    });
}

function mostrarImagemDeBoaSorte(){
    // fecha o modal
    var modal = document.getElementById('modalConfirmacao');
    modal.style.display = "none";

    var botoesParaEsconder = ['botaoSortear', 'botaoConfirmar'];
    for(var index in botoesParaEsconder) {
        document.getElementById(botoesParaEsconder[index]).style.display = "none";
    }

    document.getElementById('foto').src = '/imagens/boasorte.png';
}

function abrirModalDeConfirmacao() {
    var modal = document.getElementById('modalConfirmacao');
    modal.style.display = "block";
}

function confirmarEnvio() {
    var notificarPeloSlack = document.getElementById('checkSlack').checked;
    if(notificarPeloSlack) {
        enviarNotificacao();
        alert("A mensagem no slack foi enviada!");
    }

    confirmar();
}

function recuperarPropriedadesDoSlack(callback) {
    var propriedadesSlack = ['slackDefault','slackUrl'];
    chrome.storage.sync.get(propriedadesSlack, function(itens) {
        return callback(itens);
    });
}

function enviarNotificacao() {
    recuperarPropriedadesDoSlack(function(itens) {
        var onreadystatechange = function(REQUEST_COMPLETA_STATUS, SUCESSO, request) {
            if (request.readyState == REQUEST_COMPLETA_STATUS) {
                var mensagem, tipoMensagem;
                if (request.status != SUCESSO) {
                    alert('Ocorreu um erro na notificação para o Slack!');
                }
            }
        };

        var params = {
            'slackUrl' : itens.slackUrl,
            'slackDefault' : itens.slackDefault,
            'slackSorteado' : slackSorteado
        };

        requestUtils.sendRequestWithParameters('/enviarNotificacaoSlack', params, onreadystatechange);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#botaoSortear').addEventListener('click', sortear);
    document.querySelector('#botaoConfirmar').addEventListener('click', abrirModalDeConfirmacao);
    document.querySelector('#botaoConfirmarModal').addEventListener('click', confirmarEnvio);

    document.getElementById('enviarEmail').style.display = "none";

    // Evento que fecha o modal
    var span = document.getElementsByClassName("close")[0];
    span.addEventListener('click', function() {
        var modal = document.getElementById('modalConfirmacao');
        modal.style.display = "none";
    });

    sortear();
});
