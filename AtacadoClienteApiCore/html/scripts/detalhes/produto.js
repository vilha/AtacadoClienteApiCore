$(function () {
    CarregarDetalhes();
});

function CarregarDetalhes() {
    //debugger;
    var id = localStorage.getItem('produtoID');
    if (id == undefined || id == 0) {
        alert('AVISO - ProdutoID não foi definido.');
        return;
    } else {
        localStorage.removeItem('produtoID');
        var urlServico = 'http://localhost:10891/atacado/estoque/produto/' + id;
        $.ajax({
            url: urlServico,
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    alert('Erro ao carregar dados da produto');
                    return;
                } else {
                    var produtoID = data.produtoID;
                    var subcategoriaID = data.subcategoriaID;
                    var categoriaID = data.categoriaID;
                    var descricao = data.descricao;
                    var dataInclusao = data.dataInclusao;

                    $('#txtProdutoID').val(produtoID);
                    $('#txtSubcategoriaID').val(subcategoriaID);
                    $('#txtCategoriaID').val(categoriaID);
                    $('#txtDescricao').val(descricao);
                    $('#txtDataInclusao').val(dataInclusao);
                }
            }
        });
    }
}