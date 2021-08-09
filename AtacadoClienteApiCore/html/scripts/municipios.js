var regioes = [];
var estados = [];
var municipios = [];

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
        CarregarMunicipios(ufid);
        PreencherTabelaMunicipios();
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

function CarregarMunicipios(ufid) {
    municipios = [];
    var urlServico = 'http://localhost:10891/atacado/localizacao/estados/' + ufid + '/municipios';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var municipio = {
                    municipioID: item.municipioID,
                    ibgE6: item.ibgE6,
                    ibgE7: item.ibgE7,
                    descricao: item.descricao,
                    mesoregiaoID: item.mesoregiaoID,
                    microregiaoID: item.microregiaoID,
                    ufid: item.ufid,
                    populacao: item.populacao,
                    cep: item.cep,
                    siglaUF: item.siglaUF
                };
                municipios.push(municipio);

            }
            localStorage.setItem('municipios', JSON.stringify(municipios));
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

function PreencherTabelaMunicipios() {
    $('#tblMunicipios tbody').empty();
    if (municipios == null || municipios.length == 0) {
        alert("AVISO - os dados de Municipios não foram carregados.");
        return;
    } else {
        for (var i = 0; i < municipios.length; i++) {
            var item = municipios[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.municipioID + '</td>';
            var coluna2 = '<td>' + item.ibgE6 + '</td>';
            var coluna3 = '<td>' + item.ibgE7 + '</td>';
            var coluna4 = '<td>' + item.descricao + '</td>';
            var coluna5 = '<td>' + item.mesoregiaoID + '</td>';
            var coluna6 = '<td>' + item.microregiaoID + '</td>';
            var coluna7 = '<td>' + item.ufid + '</td>';
            var coluna8 = '<td>' + item.populacao + '</td>';
            var coluna9 = '<td>' + item.cep + '</td>';
            var coluna10 = '<td>' + item.siglaUF + '</td>';
            var coluna11 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.municipioID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + coluna6 + coluna7 + coluna8 + coluna9 + coluna10 + coluna11 + final;

            $('#tblMunicipios tbody').append(conteudo);
        }
    }
}

function LimparDados() {
    $('#cmbEstados').empty();
    $('#tblMunicipios tbody').empty();
}

function ExibirDetalhes(municipioID) {
    //debugger;
    localStorage.setItem('municipioID', municipioID);
    window.location.href = 'detalhes/municipiodetalhes.html';
}