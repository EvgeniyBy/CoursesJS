
//----------task_1

function compare(param1, param2){
    return (param1>param2);
}


//----------task_2

function showLine(inputText){
    return "Вы ввели "+inputText;
}

//----------task_3

function typeTest(param){
    if (param===null) return "Null type";
    if (param===undefined) return "Undefined type";
    return "Other type";
}

//----------task_4

function addObjectParam(obj){
    obj.checked=true;
}

//----------task_5

function numberNext(number_end){
    var number_start=0;
    while(number_start!=number_end){
        console.log(number_start);
        number_start = (number_end>0) ? number_start+1 : number_start-1 ;
 
    }
}