var categorias = [];

$(function () {
    if (localStorage.getItem('categorias') == null) {
        CarregarCategorias();
    } else {
        var temp = localStorage.getItem('categorias');
        categorias = JSON.parse(temp)
    }
    PreencherTabelaCategorias();
});

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
                    descricao: item.descricao,
                    dataInclusao: item.dataInclusao
                };
                categorias.push(categoria);

            }
            localStorage.setItem('categorias', JSON.stringify(categorias));
        }
    });
}

function PreencherTabelaCategorias() {
    if (categorias == null || categorias.length == 0) {
        alert("AVISO - os dados de Categorias não foram carregados.");
        return;
    } else {
        for (var i = 0; i < categorias.length; i++) {
            var item = categorias[i];

            var inicio = '<tr>';
            var coluna1 = '<td>' + item.categoriaID + '</td>';
            var coluna2 = '<td>' + item.descricao + '</td>';
            var coluna3 = '<td>' + item.dataInclusao + '</td>';
            var coluna4 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.categoriaID + '\'); return false;" /></td>';
            var final = '</tr>';

            var conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + final;

            $('#tblCategorias tbody').append(conteudo);
        }
    }
}

function ExibirDetalhes(categoriaID) {
    //debugger;
    localStorage.setItem('categoriaID', categoriaID);
    window.location.href = 'detalhes/categoriadetalhes.html';
}