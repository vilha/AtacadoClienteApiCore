var categorias = [];
var subcategorias = [];

$(function () {
    if (localStorage.getItem('categorias') == null) {
        CarregarCategorias();
    } else {
        var temp = localStorage.getItem('categorias');
        categorias = JSON.parse(temp)
    }
    PreencherSelectCategorias();
    EventosDaPagina();
});

function EventosDaPagina() {
    $('#cmbCategorias').change(function () {
        var catid = $('#cmbCategorias').val();
        CarregarSubcategorias(catid);
        PreencherTabelaSubcategorias();
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

function PreencherSelectCategorias() {
    //debugger;
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

function CarregarSubcategorias(catid) {
    subcategorias = [];
    var urlServico = 'http://localhost:10891/atacado/estoque/categoria/'+ catid +'/subcategorias';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var item = data[i];
                var subcategoria = {
                    subcategoriaID: item.subcategoriaID,
                    categoriaID: item.categoriaID,
                    descricao: item.descricao,
                    dataInclusao: item.dataInclusao
                };
                subcategorias.push(subcategoria);

            }
            localStorage.setItem('subcategorias', JSON.stringify(subcategorias));
        }
    });
}

function PreencherTabelaSubcategorias() {
    $('#tblSubcategorias tbody').empty();
    if (subcategorias == null || subcategorias.length == 0) {
        alert("AVISO - os dados de Subcategorias não foram carregados.");
        return;
    } else {
        for (var i = 0; i < subcategorias.length; i++) {
            var item = subcategorias[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.subcategoriaID + '</td>';
            var coluna2 = '<td>' + item.categoriaID + '</td>';
            var coluna3 = '<td>' + item.descricao + '</td>';
            var coluna4 = '<td>' + item.dataInclusao + '</td>';
            var coluna5 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.subcategoriaID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + final;

            $('#tblSubcategorias tbody').append(conteudo);
        }
    }
}

function ExibirDetalhes(subcategoriaID) {
    //debugger;
    localStorage.setItem('subcategoriaID', subcategoriaID);
    window.location.href = 'detalhes/subcategoriadetalhes.html';
}