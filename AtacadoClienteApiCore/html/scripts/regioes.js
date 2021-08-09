var regioes = [];

$(function () {
    if (localStorage.getItem('regioes') == null) {
        CarregarRegioes();
    } else {
        var temp = localStorage.getItem('regioes');
        regioes = JSON.parse(temp)
    }
    PreencherTabelaRegioes();
});

function CarregarRegioes() {
    var urlServico = 'http://localhost:10891/atacado/localizacao/regioes';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var regiao = {
                    regiaoID: item.regiaoID,
                    descricao: item.descricao,
                    siglaRegiao: item.siglaRegiao,
                    dataInclusao: item.dataInclusao
                };
                regioes.push(regiao);

            }
            localStorage.setItem('regioes', JSON.stringify(regioes));
        }
    });
}

function PreencherTabelaRegioes() {
    if (regioes == null || regioes.length == 0) {
        alert("AVISO - os dados de Regiões não foram carregados.");
        return;
    } else {
        for (var i = 0; i < regioes.length; i++) {
            var item = regioes[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.regiaoID + '</td>';
            var coluna2 = '<td>' + item.descricao + '</td>';
            var coluna3 = '<td>' + item.siglaRegiao + '</td>';
            var coluna4 = '<td>' + item.dataInclusao + '</td>';
            var coluna5 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.regiaoID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + final;

            $('#tblRegioes tbody').append(conteudo);
        }
    }
}

function ExibirDetalhes(regiaoID) {
    //debugger;
    localStorage.setItem('regiaoID', regiaoID);
    window.location.href = 'detalhes/regiaodetalhes.html';
}