var regioes = [];
var estados = [];
var mesorregioes = [];
var microrregioes = [];

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
        PreencherSelectMesorregioes();
    });

    $('#cmbMesorregioes').change(function () {
        var mesoid = $('#cmbMesorregioes').val();
        CarregarMicrorregioes(mesoid);
        PreencherTabelaMicrorregioes();
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
                    descricao: item.descricao
                };
                mesorregioes.push(mesorregiao);

            }
            localStorage.setItem('mesorregioes', JSON.stringify(mesorregioes));
        }
    });
}

function CarregarMicrorregioes(mesoid) {
    microrregioes = [];
    var urlServico = 'http://localhost:10891/atacado/localizacao/mesoregiao/' + mesoid + '/microregioes';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var microrregiao = {
                    microregiaoID: item.microregiaoID,
                    descricao: item.descricao,
                    mesoregiaoID: item.mesoregiaoID,
                    dataInclusao: item.dataInclusao,
                };
                microrregioes.push(microrregiao);

            }
            localStorage.setItem('microrregioes', JSON.stringify(microrregioes));
        }
    });
}

function PreencherSelectRegioes() {
    if (regioes == null || regioes.length == 0) {
        alert('AVISO - os dados de Regiões não foram carregados.');
        return;
    } else {
        $('#cmbRegioes').empty();
        $('#cmbRegioes').append($('<option>', { value: 0, text: 'Selecione uma regiao.' }));
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
        $('#cmbEstados').append($('<option>', { value: 0, text: 'Selecione uma estado.' }));
        for (var i = 0; i < estados.length; i++) {
            var item = estados[i];
            $('#cmbEstados').append($('<option>', { value: item.ufid, text: item.descricao }));

        }
    }
}

function PreencherSelectMesorregioes() {
    if (mesorregioes == null || mesorregioes.length == 0) {
        alert('AVISO - os dados de Mesorregioes não foram carregados.');
        return;
    } else {
        $('#cmbMesorregioes').empty();
        $('#cmbMesorregioes').append($('<option>', { value: 0, text: 'Selecione uma mesorregião' }));
        for (var i = 0; i < mesorregioes.length; i++) {
            var item = mesorregioes[i];
            $('#cmbMesorregioes').append($('<option>', { value: item.mesoregiaoID, text: item.descricao }));

        }
    }
}

function PreencherTabelaMicrorregioes() {
    $('#tblMicrorregioes tbody').empty();
    if (microrregioes == null || microrregioes.length == 0) {
        alert("AVISO - os dados de Microrregiões não foram carregados.");
        return;
    } else {
        for (var i = 0; i < microrregioes.length; i++) {
            var item = microrregioes[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.microregiaoID + '</td>';
            var coluna2 = '<td>' + item.descricao + '</td>';
            var coluna3 = '<td>' + item.mesoregiaoID + '</td>';
            var coluna4 = '<td>' + item.dataInclusao + '</td>';
            var coluna5 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.microregiaoID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + final;

            $('#tblMicrorregioes tbody').append(conteudo);
        }
    }
}

function LimparDados() {
    $('#cmbEstados').empty();
    $('#cmbMesorregioes').empty();
    $('#tblMicrorregioes tbody').empty();
}

function ExibirDetalhes(microregiaoID) {
    localStorage.setItem('microregiaoID', microregiaoID);
    window.location.href = 'detalhes/microrregiaodetalhes.html';
}