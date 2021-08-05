var subcategorias = [];

$(function () {
    if (localStorage.getItem('subcategorias') == null) {
        CarregarSubcategorias();
    } else {
        var temp = localStorage.getItem('subcategorias');
        categorias = JSON.parse(temp)
    }
    PreencherTabelaSubcategorias();
});

function CarregarSubcategorias() {
    let urlServico = 'http://localhost:37806/api/estoque/subcategoria';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let categoria = {
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
    if (subcategorias == null || subcategorias.length == 0) {
        alert("AVISO - os dados de Subcategorias não foram carregados.");
        return;
    } else {
        for (let i = 0; i < subcategorias.length; i++) {
            let item = subcategorias[i];

            let inicio = '<tr>';
            let coluna1 = '<td>' + item.subcategoriaID + '</td>';
            let coluna2 = '<td>' + item.categoriaID + '</td>';
            let coluna3 = '<td>' + item.descricao + '</td>';
            let coluna4 = '<td>' + item.dataInclusao + '</td>';
            let coluna5 = '<td>' + /*item. +*/ '</td>';
            let final = '</tr>';

            let conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + coluna5 + final;

            $('#tblSubcategorias tbody').append(conteudo);
        }
    }
}