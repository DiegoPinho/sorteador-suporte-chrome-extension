function carregaSorteiosJaRealizados() {
    requestUtils.getJSON('/ultimosSorteios', 'GET', function(resultado) {
        var tamanho = resultado.length;
        var divUltimosSorteios = document.getElementById('ultimosSorteios');
        if(tamanho === 0) {
            divUltimosSorteios.innerHTML = 'Não foram realizados sorteios';
        } else {
            var tabela = "<table><tr><th>Nome</th><th>Data</th></tr>";
            for(var i = 0, length = resultado.length; i < length; i++){
                var sorteio = resultado[i];
                var registro = '<tr><th>' + sorteio.sorteado + '</th><th>' + sorteio.data + '</th></tr>';
                tabela += registro;
            }

            tabela += '</table>';
            divUltimosSorteios.innerHTML = tabela;
        }
	});

}

function listaDeNomes(nomesArray) {
	var nomes = "";
	for(var index in nomesArray) {
		nomes+= ", " + nomesArray[index];
	}

	return nomes.substring(2,nomes.length);
}


document.addEventListener('DOMContentLoaded', function () {
	carregaSorteiosJaRealizados();
});
