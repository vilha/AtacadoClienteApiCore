var regioes = [];
var estados = [];

$(function () {
    if (localStorage.getItem('regioes') == null) {
        CarregarRegioes();
    } else {
        var temp = localStorage.getItem('regioes');
        regioes = JSON.parse(temp)
    }
    PreencherSelectRegioes();
    EventosDaPagina();
});

function EventosDaPagina() {
    $('#cmbRegioes').change(function () {
        var ragid = $('#cmbRegioes').val();
        CarregarEstados(ragid);
        PreencherTabelaEstados();
    });
}

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
                    descricao: item.descricao
                };
                regioes.push(regiao);

            }
            localStorage.setItem('regioes', JSON.stringify(regioes));
        }
    });
}

function PreencherSelectRegioes() {
    //debugger;
    if (regioes == null || regioes.length == 0) {
        alert('AVISO - os dados de Regiões não foram carregados.');
        return;
    } else {
        $('#cmbRegioes').empty();
        $('#cmbRegioes').append($('<option>', { value: 0, text: 'Selecione uma região' }));
        for (var i = 0; i < regioes.length; i++) {
            var item = regioes[i];
            $('#cmbRegioes').append($('<option>', { value: item.regiaoID, text: item.descricao }));

        }
    }
}

function CarregarEstados(regid) {
    subcategorias = [];
    var urlServico = 'http://localhost:10891/atacado/localizacao/regioes/' + regid + '/estados';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var estado = {
                    ufid: item.ufid,
                    descricao: item.descricao,
                    siglaUF: item.siglaUF,
                    regiaoID: item.regiaoID,
                    dataInclusao: item.dataInclusao
                };
                estados.push(estado);

            }
            localStorage.setItem('estados', JSON.stringify(estados));
        }
    });
}

function PreencherTabelaEstados() {
    $('#tblEstados tbody').empty();
    if (estados == null || estados.length == 0) {
        alert("AVISO - os dados de estados não foram carregados.");
        return;
    } else {
        for (var i = 0; i < estados.length; i++) {
            var item = estados[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.ufid + '</td>';
            var coluna2 = '<td>' + item.descricao + '</td>';
            var coluna3 = '<td>' + item.siglaUF + '</td>';
            var coluna4 = '<td>' + item.regiaoID + '</td>';
            var coluna5 = '<td>' + item.dataInclusao + '</td>';
            var coluna6 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.ufid + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + coluna6 + final;

            $('#tblEstados tbody').append(conteudo);
        }
    }
}

function ExibirDetalhes(ufid) {
    //debugger;
    localStorage.setItem('ufid', ufid);
    window.location.href = 'detalhes/estadodetalhes.html';
}