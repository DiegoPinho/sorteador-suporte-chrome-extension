document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#botaoSortear').addEventListener('click', function(){
        window.location.href = '/paginas/sortear.html';
    });

    document.querySelector('#botaoCadastrar').addEventListener('click', function(){
        window.location.href = "/paginas/cadastrar.html";
    });

    document.querySelector('#botaoUltimosSorteios').addEventListener('click', function(){
        window.location.href = '/paginas/ultimosSorteios.html';
    });

    document.querySelector("#engrenagem").addEventListener('click', function(){
        chrome.tabs.create({ url: "/options.html" });
    })

    var currentVersion = chrome.runtime.getManifest().version;
    document.getElementById('versao').innerHTML = 'V' + currentVersion;
});
