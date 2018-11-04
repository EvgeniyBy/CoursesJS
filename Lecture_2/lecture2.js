function compare(param1, param2){
    return (param1>param2);
}

function showLine(inputText){
    return "Вы ввели "+inputText;
}

function typeTest(param){
    if (param===null) return "Null type";
    if (param===undefined) return "Undefined type";
    return "Other type";
}

function addObjectParam(obj){
    obj.checked=true;
}

function numberNext(number_end){
    var number_start=0;
    while(number_start!=number_end){
        console.log(number_start);
        number_start = (number_end>0) ? number_start+1 : number_start-1 ;
 
    }
}