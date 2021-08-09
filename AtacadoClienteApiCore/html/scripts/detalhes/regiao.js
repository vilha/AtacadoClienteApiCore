$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes() {
    //debugger;
    var id = localStorage.getItem('regiaoID');
    if (id == undefined || id == 0) {
        alert('AVISO - RegiaoID não foi definido.');
        return;
    } else {
        localStorage.removeItem('regiaoID');
        var urlServico = 'http://localhost:10891/atacado/localizacao/regioes/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados da regiao');
                    return;
                } else {
                    var regiaoID = data.regiaoID;
                    var descricao = data.descricao;
                    var siglaRegiao = data.siglaRegiao;
                    var dataInclusao = data.dataInclusao;

                    $('#txtRegiaoID').val(regiaoID);
                    $('#txtDescricao').val(descricao);
                    $('#txtSiglaRegiao').val(siglaRegiao);
                    $('#txtDataInclusao').val(dataInclusao);
                }
            }
        });
    }
}