let categorias = [];
let subcategorias = [];
let produtos = [];

$(function () {
    if (localStorage.getItem('categorias') == null) {
        CarregarCategorias();
    } else {
        let temp = localStorage.getItem('categorias');
        categorias = JSON.parse(temp)
    }    
    EventosDaPagina();
    PreencherSelectCategorias();
});

function EventosDaPagina() {
    $('#cmbCategorias').change(function () {
        LimparDados();
        let catid = $('#cmbCategorias').val();
        CarregarSubcategorias(catid);
        PreencherSelectSubcategorias();
    });

    $('#cmbSubcategorias').change(function () {
        let catid = $('#cmbSubcategorias').val();
        CarregarProdutos(catid);
        PreencherTabelaProdutos();
    });

    $('#btnLimparDados').click(function() {
        LimparDados();
    });
}

function CarregarCategorias() {
    let urlServico = 'http://localhost:10891/atacado/estoque/categoria';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let categoria = {
                    categoriaID: item.categoriaID,
                    descricao: item.descricao,
                    dataInclusao: item.dataInclusao
                };
                categorias.push(categoria);

            }
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }
    });
}

function CarregarSubcategorias(catid) {
    subcategorias = [];
    let urlServico = 'http://localhost:10891/atacado/estoque/categoria/' + catid + '/subcategorias';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let subcategoria = {
                    subcategoriaID: item.subcategoriaID,
                    descricao: item.descricao,
                };
                subcategorias.push(subcategoria);

            }
            localStorage.setItem('subcategorias', JSON.stringify(subcategorias));
        }
    });
}

function CarregarProdutos(subcatid) {
    produtos = [];
    let urlServico = 'http://localhost:10891/atacado/estoque/subcategoria/' + subcatid + '/produtos';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let produto = {
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
        for (let i = 0; i < categorias.length; i++) {
            let item = categorias[i];
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
        for (let i = 0; i < subcategorias.length; i++) {
            let item = subcategorias[i];
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
        for (let i = 0; i < produtos.length; i++) {
            let item = produtos[i];

            let inicio = '<tr>';
            let coluna1 = '<td>' + item.produtoID + '</td>';
            let coluna2 = '<td>' + item.subcategoriaID + '</td>';
            let coluna3 = '<td>' + item.categoriaID + '</td>';
            let coluna4 = '<td>' + item.descricao + '</td>';
            let coluna5 = '<td>' + item.dataInclusao + '</td>';
            let coluna6 = '<td>' + /*item. +*/ '</td>';
            let final = '</tr>';

            let conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + coluna6 + final;

            $('#tblProdutos tbody').append(conteudo);
        }
    }
}

function LimparDados() {
    $('#cmbSubcategorias').empty();
    $('#tblProdutos tbody').empty();
}