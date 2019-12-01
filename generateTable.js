function createValueInput(className, inputId, row, col, defaultValue) {
    var input = document.createElement("input");
    input.setAttribute('class', className);
    input.setAttribute('id', inputId);
    input.setAttribute('data-row', row);
    input.setAttribute('data-col', col);
    input.setAttribute('value', defaultValue);

    return input;
}

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
                inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=1 readonly>';
            } else {
                var inputId = 'сriterium_' + i + '_' + j; 
                inputHtml = createValueInput('criteriumValue', inputId, i, j);
                inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    }
    return table;
}

function createCriterionTable(size, criterionName) {
    var table = $('<table class="table"></table>'); //.addClass('foo');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr></tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' value="' + criterionName + '" readonly>';
            } else if (i == 0 || j == 0) {
                inputHtml = '<input type="text" ' + ' id="objects'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                inputHtml = '<input type="text" '  + ' id="objects'+ i + '_' + j + '" class="objectsName"'  + 'data-row='+ i + ' data-col=' + j + ' value=1 readonly>';
            } else {
                inputHtml = '<input type="text" '  + ' id="objects'+ i + '_' + j + '" class="objectsName"'  + 'data-row='+ i + ' data-col=' + j + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    }
    return table;
}

function reflectCriteriaName(inputCriteriaName, type) {
    var reflectionCol = $(inputCriteriaName).data('row');
    var reflectionRow = $(inputCriteriaName).data('col');
    var reflectionId = '#' + type + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val($(inputCriteriaName).val());
    console.log(reflectionId);
}

function showObjectControls() {
    $('#objects-controll').attr("style","display: block");
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
    var tableObjects = $('#tables');
    var butCreateTable = $("#createTable");
    var butCreateObjects = $("#createTableObjects");
    butCreateTable.on('click', function () {
        var countNodes = $("#countNodes").val();
        table.html(createTable(countNodes));
        showObjectControls();
        field.on('change', '.сriteriaName', function (e) {
            console.log(e.target);
            reflectCriteriaName(e.target, 'сriteria');
        });
    });    
    // butCreateObjects.on('click', function () {
    //     console.log(123);
    //     var countObjects = $("#countObjects").val();
    //     console.log($("#countNodes").val());
    //     for(var j = 0; j < $("#countNodes").val(); j++){
    //         tableObjects.append(createCriterionTable(countObjects, 'Критерий'));
    //     }
    //     showObjectControls();
    //     field.on('change', '.objectsName', function (e) {
    //         console.log(e.target);
    //         reflectCriteriaName(e.target, 'objects');
    //     });
    // });
});
