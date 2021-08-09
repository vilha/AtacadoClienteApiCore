var regioes = [];
var estados = [];
var mesorregioes = [];

$(function () {
    if (localStorage.getItem('regioes') == null) {
        CarregarRegioes();
    } else {
        var temp = localStorage.getItem('regioes');
        regioes = JSON.parse(temp)
    }
    EventosDaPagina();
    PreencherSelectRegioes();
});

function EventosDaPagina() {
    $('#cmbRegioes').change(function () {
        LimparDados();
        var regiaoid = $('#cmbRegioes').val();
        CarregarEstados(regiaoid);
        PreencherSelectEstados();
    });

    $('#cmbEstados').change(function () {
        var ufid = $('#cmbEstados').val();
        CarregarMesorregioes(ufid);
        PreencherTabelaMesorregioes();
    });

    $('#btnLimparDados').click(function () {
        LimparDados();
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

function CarregarEstados(regiaoid) {
    estados = [];
    var urlServico = 'http://localhost:10891/atacado/localizacao/regioes/' + regiaoid + '/estados';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var estado = {
                    ufid: item.ufid,
                    descricao: item.descricao
                };
                estados.push(estado);
            }
            localStorage.setItem('estados', JSON.stringify(estados));
        }
    });
}

function CarregarMesorregioes(ufid) {
    mesorregioes = [];
    var urlServico = 'http://localhost:10891/atacado/localizacao/estados/' + ufid + '/mesoregioes';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var mesorregiao = {
                    mesoregiaoID: item.mesoregiaoID,
                    descricao: item.descricao,
                    ufid: item.ufid,
                    dataInclusao: item.dataInclusao
                };
                mesorregioes.push(mesorregiao);

            }
            localStorage.setItem('mesorregioes', JSON.stringify(mesorregioes));
        }
    });
}

function PreencherSelectRegioes() {
    if (regioes == null || regioes.length == 0) {
        alert('AVISO - os dados de Regioes não foram carregados.');
        return;
    } else {
        $('#cmbRegioes').empty();
        $('#cmbRegioes').append($('<option>', { value: 0, text: 'Selecione uma regiao' }));
        for (var i = 0; i < regioes.length; i++) {
            var item = regioes[i];
            $('#cmbRegioes').append($('<option>', { value: item.regiaoID, text: item.descricao }));

        }
    }
}

function PreencherSelectEstados() {
    if (estados == null || estados.length == 0) {
        alert('AVISO - os dados de Estados não foram carregados.');
        return;
    } else {
        $('#cmbEstados').empty();
        $('#cmbEstados').append($('<option>', { value: 0, text: 'Selecione uma estado' }));
        for (var i = 0; i < estados.length; i++) {
            var item = estados[i];
            $('#cmbEstados').append($('<option>', { value: item.ufid, text: item.descricao }));

        }
    }
}

function PreencherTabelaMesorregioes() {
    $('#tblMesorregioes tbody').empty();
    if (mesorregioes == null || mesorregioes.length == 0) {
        alert("AVISO - os dados de Mesorregioes não foram carregados.");
        return;
    } else {
        for (var i = 0; i < mesorregioes.length; i++) {
            var item = mesorregioes[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.mesoregiaoID + '</td>';
            var coluna2 = '<td>' + item.descricao + '</td>';
            var coluna3 = '<td>' + item.ufid + '</td>';
            var coluna4 = '<td>' + item.dataInclusao + '</td>';
            var coluna5 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.mesoregiaoID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + final;

            $('#tblMesorregioes tbody').append(conteudo);
        }
    }
}

function LimparDados() {
    $('#cmbEstados').empty();
    $('#tblMesorregioes tbody').empty();
}

function ExibirDetalhes(mesoregiaoID) {
    //debugger;
    localStorage.setItem('mesoregiaoID', mesoregiaoID);
    window.location.href = 'detalhes/mesorregiaodetalhes.html';
}