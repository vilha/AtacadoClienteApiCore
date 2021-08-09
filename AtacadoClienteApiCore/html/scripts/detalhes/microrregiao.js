$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes() {
    //debugger;
    var id = localStorage.getItem('microregiaoID');
    if (id == undefined || id == 0) {
        alert('AVISO - MicroregiaoID não foi definido.');
        return;
    } else {
        localStorage.removeItem('mesoregiaoID');
        var urlServico = 'http://localhost:10891/atacado/localizacao/microregiao/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados da microrregiao.');
                    return;
                } else {
                    var microregiaoID = data.microregiaoID;
                    var descricao = data.descricao;
                    var mesoregiaoID = data.mesoregiaoID;
                    var dataInclusao = data.dataInclusao;

                    $('#txtMicroregiaoID').val(microregiaoID);
                    $('#txtDescricao').val(descricao);
                    $('#txtMesoregiaoID').val(mesoregiaoID);
                    $('#txtDataInclusao').val(dataInclusao);
                }
            }
        });
    }
}