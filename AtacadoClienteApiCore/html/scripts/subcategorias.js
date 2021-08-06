let categorias = [];
let subcategorias = [];

$(function () {
    if (localStorage.getItem('categorias') == null) {
        CarregarCategorias();
    } else {
        let temp = localStorage.getItem('categorias');
        categorias = JSON.parse(temp)
    }
    PreencherSelectCategorias();
    EventosDaPagina();
});

function EventosDaPagina() {
    $('#cmbCategorias').change(function () {
        let catid = $('#cmbCategorias').val();
        CarregarSubcategorias(catid);
        PreencherTabelaSubcategorias();
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
        for (let i = 0; i < categorias.length; i++) {
            let item = categorias[i];
            $('#cmbCategorias').append($('<option>', { value: item.categoriaID, text: item.descricao }));

        }
    }
}

function CarregarSubcategorias(catid) {
    subcategorias = [];
    let urlServico = 'http://localhost:10891/atacado/estoque/categoria/'+ catid +'/subcategorias';
    $.ajax({
        url: urlServico,
        async: false,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                let subcategoria = {
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


