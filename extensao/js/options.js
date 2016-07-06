var gmail = "https://mail.google.com/mail/?extsrc=mailto&url=%s";

var configuracaoDefault = {
    'gmail' : true,
    'subject' : 'Você foi sorteado para resolver uma SUP!',
    'useTabContext' : true,
    'slackDefault' : 'sup-suporte',
    'slackUrl': ''
};

function salvarAlteracoes() {
    var subject = document.getElementById('subject').value;
    var useTabContext = document.getElementById('useTabContext').checked;
    var slackDefault = document.getElementById('slack-default').value;
    var slackUrl = document.getElementById('slack-url').value;
    chrome.storage.sync.set({
        'provider' : gmail,
        'subject' : subject,
        'useTabContext': useTabContext,
        'slackDefault': slackDefault,
        'slackUrl': slackUrl
    }, function() {
        alert('Sucesso ao salvar!');
    })
}

function carregarOpcoes() {
    var propriedades = ["provider", "subject", "useTabContext", "slackDefault", "slackUrl"];
    chrome.storage.sync.get(propriedades, function(itens) {
        document.getElementById('gmail').checked = true; // TODO: Mudar quando der suporte a outros providers
        document.getElementById('subject').value = itens.subject || configuracaoDefault.subject;
        document.getElementById('useTabContext').checked = itens.useTabContext || configuracaoDefault.useTabContext;
        document.getElementById('slack-default').value = itens.slackDefault || configuracaoDefault.slackDefault;
        document.getElementById('slack-url').value = itens.slackUrl || configuracaoDefault.slackUrl;
    })
}

document.addEventListener('DOMContentLoaded', function() {
    carregarOpcoes();
    document.querySelector('#botaoConfirmarOpcoes').addEventListener('click', salvarAlteracoes);
});
