let categorias = [];

$(function () {
    if (localStorage.getItem('categorias') == null) {
        CarregarCategorias();
    } else {
        let temp = localStorage.getItem('categorias');
        categorias = JSON.parse(temp)
    }
    PreencherTabelaCategorias();
});

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

function PreencherTabelaCategorias() {
    if (categorias == null || categorias.length == 0) {
        alert("AVISO - os dados de Categorias não foram carregados.");
        return;
    } else {
        for (let i = 0; i < categorias.length; i++) {
            let item = categorias[i];

            let inicio = '<tr>';
            let coluna1 = '<td>' + item.categoriaID + '</td>';
            let coluna2 = '<td>' + item.descricao + '</td>';
            let coluna3 = '<td>' + item.dataInclusao + '</td>';
            let coluna4 = '<td><input type="button" id="btnDetalhes" value="Detalhes" onclick="ExibirDetalhes(\'' + item.categoriaID + '\'); return false;" /></td>';
            let final = '</tr>';

            let conteudo = inicio + coluna1 + coluna2 + coluna3 + coluna4 + final;

            $('#tblCategorias tbody').append(conteudo);
        }
    }
}

function ExibirDetalhes(categoriaID) {
    debugger;
    localStorage.setItem('categoriaID', categoriaID);
    //let r = window.open('categoriadetalhes.html', '_blank');
    window.location.href = 'categoriadetalhes.html';
}