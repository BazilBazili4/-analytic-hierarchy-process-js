function createInput(className, inputId, row, col, defaultValue) {
    var input = document.createElement("input");
    input.setAttribute('class', className);
    input.setAttribute('id', inputId);
    input.setAttribute('data-row', row);
    input.setAttribute('data-col', col);
    input.setAttribute('value', defaultValue);

    return input;
}

function generateInputId(className, row, col) {
    var inputId = className + row + '_' + col; 
    return inputId;
}

function createVoidInput() {
    var input = document.createElement("input");
    input.setAttribute('readonly', 'readonly');
    return input;
}

function createTable(size) {
    var table = $('<table class="table"></table>'); //.addClass('foo');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr>dfd</tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';1
            if (i == 0 && j == 0) {
                inputHtml = '';
                // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (i == 0 || j == 0) {
                var inputId = generateInputId('criterionName', i, j); 
                inputHtml = createInput('criterionName', inputId, i, j, 'Название');
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                var inputId = generateInputId('criterionValue', i, j); 
                inputHtml = createInput('criterionValue', inputId, i, j, 1);
                inputHtml.setAttribute('readonly', 'readonly');                ;
            } else {
                var inputId = generateInputId('criterionValue', i, j); 
                inputHtml = createInput('criterionValue', inputId, i, j, 0);
                // inputHtml = '<input type="number" ' + 'class="inputCriteria"'  + 'data-type="inputCriteria"' + ' value=0>';
            }

            var element = $('<td></td>').append(inputHtml);//.text("result" + j + i); //append(input id ij)
            row.append(element);
        }
        table.append(row);
    }
    return table;
}

function getInputValue(className, row, col) {
    inputIdSelector = '#' + generateInputId(className, row, col);
    console.log('#' + generateInputId(className, row, col));
    console.log($(inputIdSelector).val());
    return $(inputIdSelector).val();
}

function getCriterionName(criterionId) {
    return getInputValue('criterionName', criterionId, 0);
}

function getCriterionValues(criterionId, criteriaCount) {
    var criterionValues = [];
    for(var i = 0; i < criteriaCount; i++){
        criterionValues[i] = Number(getInputValue('criterionValue', criterionId, i + 1));
    }
    console.log(criterionValues);

}

function createCriterionTable(size, criterionName) {
    var table = $('<table class="table"></table>'); //.addClass('foo');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr></tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';
            if (i == 0 && j == 0) {
                inputHtml = '<input type="text"сriteriaName ' + ' data-row='+ i + 'data-col=' + j + ' value="' + criterionName + '" readonly>';
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

function reflectInputValue(input) {
    var reflectionClass = $(input).attr('class');
    var reflectionCol = $(input).data('row');
    var reflectionRow = $(input).data('col');
    var reflectionId = '#' + reflectionClass + reflectionRow + '_' + reflectionCol;
    console.log(reflectionId);

    $(reflectionId).val($(input).val());
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
        field.on('change', '.criterionName', function (e) {
            console.log(e.target);
            reflectInputValue(e.target);
        });
    });    
    butCreateObjects.on('click', function () {
        getCriterionValues(1, $("#countNodes").val());
        // console.log(123);
        // var countObjects = $("#countObjects").val();
        // console.log($("#countNodes").val());
        // for(var j = 0; j < $("#countNodes").val(); j++){
        //     tableObjects.append(createCriterionTable(countObjects, 'Критерий'));
        // }
        // showObjectControls();
        // field.on('change', '.objectsName', function (e) {
        //     console.log(e.target);
        //     reflectCriteriaName(e.target, 'objects');
        // });
    });
});
