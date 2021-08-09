$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes() {
    debugger;
    var id = localStorage.getItem('municipioID');
    if (id == undefined || id == 0) {
        alert('AVISO - MunicipioID não foi definido.');
        return;
    } else {
        localStorage.removeItem('municipioID');
        var urlServico = 'http://localhost:10891/atacado/localizacao/municipio/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados do municipio.');
                    return;
                } else {
                    var municipioID = data.municipioID;
                    var ibgE6 = data.ibgE6;
                    var ibgE7 = data.ibgE7;
                    var descricao = data.descricao;
                    var mesoregiaoID = data.mesoregiaoID;
                    var microregiaoID = data.microregiaoID;
                    var ufid = data.ufid;
                    var populacao = data.populacao;
                    var cep = data.cep;
                    var siglaUF = data.siglaUF;

                    $('#txtMunicipioID').val(municipioID);
                    $('#txtIBGE6').val(ibgE6);
                    $('#txtIBGE7').val(ibgE7);
                    $('#txtDescricao').val(descricao);
                    $('#txtMesoregiaoID').val(mesoregiaoID);
                    $('#txtMicroregiaoID').val(microregiaoID);
                    $('#txtEstadoID').val(ufid);
                    $('#txtPopulacao').val(populacao);
                    $('#txtCEP').val(cep);
                    $('#txtSiglaUF').val(siglaUF);
                }
            }
        });
    }
}