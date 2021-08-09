var categorias = [];
var subcategorias = [];
var produtos = [];

$(function () {
    if (localStorage.getItem('categorias') == null) {
        CarregarCategorias();
    } else {
        var temp = localStorage.getItem('categorias');
        categorias = JSON.parse(temp)
    }    
    EventosDaPagina();
    PreencherSelectCategorias();
});

function EventosDaPagina() {
    $('#cmbCategorias').change(function () {
        LimparDados();
        var catid = $('#cmbCategorias').val();
        CarregarSubcategorias(catid);
        PreencherSelectSubcategorias();
    });

    $('#cmbSubcategorias').change(function () {
        var subcatid = $('#cmbSubcategorias').val();
        CarregarProdutos(subcatid);
        PreencherTabelaProdutos();
    });

    $('#btnLimparDados').click(function() {
        LimparDados();
    });
}

function CarregarCategorias() {
    var urlServico = 'http://localhost:10891/atacado/estoque/categoria';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var categoria = {
                    categoriaID: item.categoriaID,
                    descricao: item.descricao
                };
                categorias.push(categoria);
            }
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }
    });
}

function CarregarSubcategorias(catid) {
    subcategorias = [];
    var urlServico = 'http://localhost:10891/atacado/estoque/categoria/' + catid + '/subcategorias';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var subcategoria = {
                    subcategoriaID: item.subcategoriaID,
                    descricao: item.descricao
                };
                subcategorias.push(subcategoria);
            }
            localStorage.setItem('subcategorias', JSON.stringify(subcategorias));
        }
    });
}

function CarregarProdutos(subcatid) {
    produtos = [];
    var urlServico = 'http://localhost:10891/atacado/estoque/subcategoria/' + subcatid + '/produtos';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var produto = {
                    produtoID: item.produtoID,
                    subcategoriaID: item.subcategoriaID,
                    categoriaID: item.categoriaID,
                    descricao: item.descricao,
                    dataInclusao: item.dataInclusao
                };
                produtos.push(produto);

            }
            localStorage.setItem('produtos', JSON.stringify(produtos));
        }
    });
}

function PreencherSelectCategorias() {
    if (categorias == null || categorias.length == 0) {
        alert('AVISO - os dados de Categorias não foram carregados.');
        return;
    } else {
        $('#cmbCategorias').empty();
        $('#cmbCategorias').append($('<option>', { value: 0, text: 'Selecione uma categoria' }));
        for (var i = 0; i < categorias.length; i++) {
            var item = categorias[i];
            $('#cmbCategorias').append($('<option>', { value: item.categoriaID, text: item.descricao }));

        }
    }
}

function PreencherSelectSubcategorias() {
    if (subcategorias == null || subcategorias.length == 0) {
        alert('AVISO - os dados de Subcategorias não foram carregados.');
        return;
    } else {
        $('#cmbSubcategorias').empty();
        $('#cmbSubcategorias').append($('<option>', { value: 0, text: 'Selecione uma subcategoria' }));
        for (var i = 0; i < subcategorias.length; i++) {
            var item = subcategorias[i];
            $('#cmbSubcategorias').append($('<option>', { value: item.subcategoriaID, text: item.descricao }));

        }
    }
}

function PreencherTabelaProdutos() {
    $('#tblProdutos tbody').empty();
    if (produtos == null || produtos.length == 0) {
        alert("AVISO - os dados de Produtos não foram carregados.");
        return;
    } else {
        for (var i = 0; i < produtos.length; i++) {
            var item = produtos[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.produtoID + '</td>';
            var coluna2 = '<td>' + item.subcategoriaID + '</td>';
            var coluna3 = '<td>' + item.categoriaID + '</td>';
            var coluna4 = '<td>' + item.descricao + '</td>';
            var coluna5 = '<td>' + item.dataInclusao + '</td>';
            var coluna6 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.produtoID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + coluna6 + final;

            $('#tblProdutos tbody').append(conteudo);
        }
    }
}

function LimparDados() {
    $('#cmbSubcategorias').empty();
    $('#cmbSubcategorias').empty();
    $('#tblProdutos tbody').empty();
}

function ExibirDetalhes(produtoID) {
    localStorage.setItem('produtoID', produtoID);
    window.location.href = 'detalhes/produtodetalhes.html';
}