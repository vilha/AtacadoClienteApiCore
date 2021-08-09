$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes() {
    //debugger;
    var id = localStorage.getItem('ufid');
    if (id == undefined || id == 0) {
        alert('AVISO - EstadoID não foi definido.');
        return;
    } else {
        localStorage.removeItem('ufid');
        var urlServico = 'http://localhost:10891/atacado/localizacao/estados/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados da estado');
                    return;
                } else {
                    var ufid = data.ufid;
                    var descricao = data.descricao;
                    var siglaUF = data.siglaUF;
                    var regiaoID = data.regiaoID;
                    var dataInclusao = data.dataInclusao;

                    $('#txtEstadoID').val(ufid);
                    $('#txtDescricao').val(descricao);
                    $('#txtSiglaUF').val(siglaUF);
                    $('#txtRegiaoID').val(regiaoID);
                    $('#txtDataInclusao').val(dataInclusao);
                }
            }
        });
    }
}