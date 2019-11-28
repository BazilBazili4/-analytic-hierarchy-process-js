function createTable(size) {
    var table = $('<table class="table"></table>'); //.addClass('foo');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr></tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (i == 0 || j == 0) {
                inputHtml = '<input type="text" ' + ' id="'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                inputHtml = '<input type="text" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=1 readonly>';
            } else {
                inputHtml = '<input type="text" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    }
    return table;
}

function createCriterionTable(size) {
    var table = $('<table class="table"></table>'); //.addClass('foo');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr></tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (i == 0 || j == 0) {
                inputHtml = '<input type="text" ' + ' id="'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                inputHtml = '<input type="text" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=1 readonly>';
            } else {
                inputHtml = '<input type="text" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    }
    return table;
}

function reflectCriteriaName(inputCriteriaName) {
    var reflectionCol = $(inputCriteriaName).data('row');
    var reflectionRow = $(inputCriteriaName).data('col');
    var reflectionId = '#' + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val($(inputCriteriaName).val());
    console.log($(reflectionId).val());
}

//считывает и строит граф, наверное стоит назвать create graph
function readTable(table) {
    return function() {
        table.each(function(row){
            $(this).find('td').each(function(cell){
                console.log($(this).children().val());
            });
        });
    };
}

$(document).ready(function(){
    var her = $("h2");
    her.css("color", "red"); 
    var field = $('#content');
    var table = $('#table');
    var butCreateTable = $("#createTable");
    var butCreateGraph = $("#createGraph");
    butCreateTable.on('click', function () {
        var countNodes = $("#countNodes").val();
        table.html(createTable(countNodes));

        field.on('change', '.сriteriaName', function (e) {
            console.log(e.target);
            reflectCriteriaName(e.target);
        });

    });
});
