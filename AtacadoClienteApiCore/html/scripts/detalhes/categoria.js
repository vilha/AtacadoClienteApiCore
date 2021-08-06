$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes () {
    debugger;
    var id = localStorage.getItem('categoriaID');
    if (id == undefined || id == 0) {
        alert('AVISO - CategoriaID não foi definido.');
        return;
    } else {
        localStorage.removeItem('categoriaID');
        let urlServico = 'http://localhost:10891/atacado/estoque/categoria/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados da categoria');
                    return;
                } else {
                    let categoriaID = data.categoriaID;
                    let descricao = data.descricao;
                    let dataInclusao = data.dataInclusao;

                    $('#txtCategoriaID').val(categoriaID);
                    $('#txtDescricao').val(descricao);
                    $('#txtDataInclusao').val(dataInclusao);
                }
            }
        });

    }
}