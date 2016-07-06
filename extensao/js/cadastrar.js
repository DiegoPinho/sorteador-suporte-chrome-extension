/**
 * [cadastrar description]
 * @return {[type]} [description]
 */
function cadastrar() {
	event.preventDefault();
	var onreadystatechange = function(REQUEST_COMPLETA_STATUS, SUCESSO, request) {
		if (request.readyState == REQUEST_COMPLETA_STATUS) {
			var mensagem, tipoMensagem;
			if (request.status == SUCESSO) {
				mensagem = document.createTextNode('Cadastro feito com sucesso');
				tipoMensagem = 'success';
			} else {
				mensagem = document.createTextNode('Ocorreu um erro indesperado');
				tipoMensagem = 'error';
			}

			// revela a mensagem de sucesso (ou não), na tela
			var blocoMensagem = document.createElement('p');
			blocoMensagem.className = tipoMensagem;
			blocoMensagem.appendChild(mensagem);
			var body = document.getElementsByTagName("BODY")[0];
			body.appendChild(blocoMensagem);
		}
	};

	var params = {
		'nome' : encodeURIComponent(document.getElementById("nome").value),
		'urlFoto' : encodeURIComponent(document.getElementById("urlFoto").value),
		'email' : encodeURIComponent(document.getElementById("email").value),
		'slack' : encodeURIComponent(document.getElementById("slack").value)
	};

	requestUtils.sendRequestWithParameters('/cadastrar', params, onreadystatechange);
}

/**
 * [buscarEPreencherNomeDeJaCadastrados description]
 * @return {[type]} [description]
 */
function buscarEPreencherNomeDeJaCadastrados() {
	requestUtils.getJSON('/cadastrados', 'GET', function(resultado) {
		var nomes = [];
		for(var i=0, length = resultado.length; i < length; i++){
			nomes.push(resultado[i].nome);
		}

		var divCandidatosCadastrados = document.getElementById('candidatosCadastrados');
		var mensagem = document.createTextNode(listaDeNomes(nomes));
		var blocoNomes = document.createElement('p');
		blocoNomes.appendChild(mensagem);

		divCandidatosCadastrados.appendChild(blocoNomes);
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
	buscarEPreencherNomeDeJaCadastrados();
      document.getElementById('formCadastro').addEventListener('submit', cadastrar);
});
