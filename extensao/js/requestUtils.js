if(requestUtils == null) {

    var BASEURL = "https://sorteador-suporte.herokuapp.com"; // http://localhost:8080
    var REQUEST_COMPLETA_STATUS = 2;
    var SUCESSO = 200;

    var requestUtils = {

        /**
         * Envia uma request para a url especificada e retorna um JSON do servidor
         *
         * @param  {String}   url      Url de destino (sem o contexto, ex: /cadastro)
         * @param  {String}   method   Método HTTP a ser utilizado
         * @param  {Function} callback Função que deve ser retornada no onload da request
         *
         */
        getJSON: function(url, method, callback) {
            var httpRequest = new XMLHttpRequest();
            httpRequest.open(method, BASEURL + url);
            httpRequest.responseType = 'json';
            httpRequest.onload = function() {
                callback(httpRequest.response);
            }

            httpRequest.send();
        },


        /**
         * Envia uma request com parâmetros para o servidor
         *
         * @param  {String}   url      Url de destino (sem o contexto, ex: /cadastro)
         * @param  {Object}   params   Parâmetros que serão enviados na request (ex {'teste': 'teste'})
         * @param  {Function} callback Função que deve ser retornada no onreadystatechange da request.
         *                             Ela deve receber os parâmetros REQUEST_COMPLETA_STATUS, SUCESSO e o objeto httpRequest
         *
         */
        sendRequestWithParameters: function(url, params, callback) {
            var httpRequest = new XMLHttpRequest();
        	httpRequest.open('POST', BASEURL + url, true);
        	httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            var urlParams = '';
            for(var x in params) {
                urlParams += '&' + x + '=' + params[x];
            }

            urlParams = urlParams.substring(1, urlParams.length); // remove o primeiro &
            urlParams = urlParams.replace(/%20/g, '+');

            httpRequest.onreadystatechange = function() {
                callback(REQUEST_COMPLETA_STATUS, SUCESSO, httpRequest);
            };

        	httpRequest.send(urlParams);
        }

    }

}
