$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes() {
    var id = localStorage.getItem('mesoregiaoID');
    if (id == undefined || id == 0) {
        alert('AVISO - MesoregiaoID não foi definido.');
        return;
    } else {
        localStorage.removeItem('mesoregiaoID');
        var urlServico = 'http://localhost:10891/atacado/localizacao/mesoregiao/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados da mesorregião.');
                    return;
                } else {
                    var mesoregiaoID = data.mesoregiaoID;
                    var descricao = data.descricao;
                    var ufid = data.ufid;
                    var dataInclusao = data.dataInclusao;

                    $('#txtMesoregiaoID').val(mesoregiaoID);
                    $('#txtDescricao').val(descricao);
                    $('#txtEstadoID').val(ufid);
                    $('#txtDataInclusao').val(dataInclusao);
                }
            }
        });
    }
}