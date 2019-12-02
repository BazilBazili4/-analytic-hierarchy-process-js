function getConfig(params) {
    return {
        criteriaHeader: 'criterionName',
        criteriaValue: 'criterionValue',
        objectsHeader: 'objectName',
        objectValue: 'objectValue',
        getCriteriaHeaderClassSelector() {
            return '.' + this.criteriaHeader;
        },
        getCriteriaValueClassSelector() {
            return '.' + this.criteriaValue;
        },
        getObjectHeaderClassSelector() {
            return '.' + this.objectsHeader;
        },
        getObjectValueClassSelector() {
            return '.' + this.objectValue;
        }
    }
}

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

function createTable(size, headersClass, valuesClass, tableName = '') {
    var table = $('<table class="table"></table>'); //.addClass('foo');
    var sizeWithNodes = Number(size) + 1;
    for(var i = 0; i < sizeWithNodes; i++){
        var row = $('<tr>dfd</tr>');//.text('result ' + i);
        for(var j = 0; j < sizeWithNodes; j++){
            var inputHtml = '';1
            if (i == 0 && j == 0) {
                inputHtml = tableName;
                // inputHtml = '<input type="text" ' + ' data-row='+ i + 'data-col=' + j + ' readonly>';
            } else if (i == 0 || j == 0) {
                var inputId = generateInputId(headersClass, i, j); 
                inputHtml = createInput(headersClass, inputId, i, j, 'Название');
                // inputHtml = '<input type="text" ' + ' id="сriteria'+ i + '_' + j + '" class="сriteriaName"'  + 'data-row='+ i + ' data-col=' + j + ' value="Название">';
            } else if (i == j) {
                var inputId = generateInputId(valuesClass, i, j); 
                inputHtml = createInput(valuesClass, inputId, i, j, 1);
                inputHtml.setAttribute('readonly', 'readonly');                ;
            } else {
                var inputId = generateInputId(valuesClass, i, j); 
                inputHtml = createInput(valuesClass, inputId, i, j, 0);
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
    return criterionValues;
}

function getCriteriaTotal(criteriaArray) {
    let total = 0;
    total = criteriaArray.reduce(function(sum, criterion) {
        return sum + criterion.values.reduce(function(sum, current) {
            return sum + current;
        }, 0);      
    }, 0);          
    return total;
}

function getGeoMean(values) {
    let mult = 1;
    for (let index = 0; index < values.length; index += 1) {
        mult *= values[index];
    }
    console.log(mult);

    return Math.pow(mult, 1/values.length);
}

function getRandomConsistency(countCriteria) {
    const consistency = [0, 0, 0, 0.58, 0.90, 1.12, 1.24, 1.32, 1.41, 1.45, 1.49];
    return consistency[countCriteria];
}

function getLocalPriorityVector(criteriaArray) {
    return criteriaArray.map(
        function (criterion) {
            return getGeoMean(criterion.values);
        }
    );
}

function getLocalPriorityVectorNormalized(criteriaArray) {
    return criteriaArray.map(
        function (criterion) {
            return getGeoMean(criterion.values) / getCriteriaTotal(criteriaArray);
        }
    );
}


function setCriterion(criterionId = 1, criterionName = '', criterionValues = []) {
    return {
        id: criterionId,
        name: criterionName,
        values: criterionValues
    };
}


function setCriteriaArray(criteriaCount) {
    criteriaArray = [];
    for(var i = 0; i < criteriaCount; i++){
        criterionId = i + 1;
        criterionName = getCriterionName(criterionId);
        criterionValues = getCriterionValues(criterionId, criteriaCount);
        criteriaArray[i] = setCriterion(criterionId, criterionName, criterionValues);
    }
    return criteriaArray;
}

function reflectInputValue(input) {
    var reflectionClass = $(input).attr('class');
    var reflectionCol = $(input).data('row');
    var reflectionRow = $(input).data('col');
    var reflectionId = '#' + reflectionClass + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val($(input).val());
}

function reflectCriterionValue(input) {
    var reflectionClass = $(input).attr('class');
    var reflectionCol = $(input).data('row');
    var reflectionRow = $(input).data('col');
    var reflectionId = '#' + reflectionClass + reflectionRow + '_' + reflectionCol;
    $(reflectionId).val(1/$(input).val());
}

function showObjectControls() {
    $('#objects-controll').attr("style","display: block");
}


$(document).ready(function(){
    var config = getConfig();
    var her = $("h2");
    her.css("color", "red"); 
    var field = $('#content');
    var table = $('#table');
    var tableObjects = $('#tables');
    var butCreateTable = $("#createTable");
    var butCreateObjects = $("#createTableObjects");
    butCreateTable.on('click', function () {
        var countNodes = $("#countNodes").val();
        table.html(createTable(countNodes, config.criteriaHeader, config.criteriaValue));
        showObjectControls();
        field.on('change', '.criterionName', function (e) {
            reflectInputValue(e.target);
        });
        field.on('change', '.criterionValue', function (e) {
            reflectCriterionValue(e.target);
        });
    });    
    butCreateObjects.on('click', function () {
        criteriaArray = setCriteriaArray($("#countNodes").val());

        getCriteriaTotal(criteriaArray);
        console.log(getLocalPriorityVector(criteriaArray));
        console.log(getLocalPriorityVectorNormalized(criteriaArray));
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
