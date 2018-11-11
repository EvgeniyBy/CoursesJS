var calc=(function(){
    var PI=3.14;
    function priority(el1, el2){
        el1=priorityElem(el1);
        el2=priorityElem(el2);
        return el2<=el1;
    }
    
    function priorityElem(el){
        switch (el){
            case ')': {el=0; break;}
            case '(': {el=0; break;}
            case '+': {el=1; break;}
            case '-': {el=1; break;}
            case '*': {el=2; break;}
            case '/': {el=3; break;}        
        }
        return el;
    }
    function translate(input){
        var result="";
        var stack=[];
        var check=false;
        for(var i=0; i<input.length;i++){        
            if ((input[i]=="+")||(input[i]=="-")||(input[i]=="*")||(input[i]=="/")){
                if (stack.length!=0){
                    if (priority(stack[stack.length-1], input[i])) {                                                               
                        while (stack.length!=0){
                            if (stack[stack.length-1]=="("){break;}
                            result+= " " +  stack.pop() +" ";  
                        }       
                        stack.push(input[i]);                                               
                        continue;
                    }
                }
                stack.push(input[i]);
                result+=" ";
                continue;
            }
    
            if (input[i]=="("){
                stack.push(input[i]); 
                check=true;
                continue;
            }
            if (input[i]==")"){            
                while (stack.length!=0){
                    if (stack[stack.length-1]!="("){
                        result+= " " +  stack.pop() +" "; 
                    } 
                    else {
                        stack.pop();
                        break;
                    }
                }       
                check=false;
                continue;
            }
            result+=input[i];
        }
    
        while (stack.length!=0){
            result+= " " +  stack.pop() +" ";  
        }
        return result;
    }

    function sum(operand1, operand2){
        return operand1+operand2;
    }
    function subtraction(operand1, operand2){
        return operand1-operand2;
    }
    function multiplication(operand1, operand2){
        return operand1*operand2;
    }
    function division(operand1, operand2){
        return operand1/operand2;
    }

  

    return {       
        resolution: function(input){
            var polsca=translate(input);
            var arr_operand=[];
            var arr_num=[];
            var str="";
            var op1, op2;
            for (var i=0; i<polsca.length; i++){
                if (polsca[i]!=" "){
                    if ((polsca[i]=="+")||(polsca[i]=="-")||(polsca[i]=="*")||(polsca[i]=="/")){                        
                        op2 = Number(arr_num.pop());
                        op1 = Number(arr_num.pop());                        
                    }
                    else {                       
                        str=str+polsca[i];
                    }
                    switch (polsca[i]){
                        case '+': {arr_num.push(sum(op1,op2)); break;}
                        case '-': {arr_num.push(subtraction(op1,op2)); break;}
                        case '*': {arr_num.push(multiplication(op1,op2)); break;}
                        case '/': {arr_num.push(division(op1,op2)); break;}                        
                    }
                    
                } 
                else {                    
                    if (str!="") arr_num.push(str);
                    str="";
                }               
            }
            /*arr_num.push(str);
            arr_num.reverse();*/

            return arr_num[0];
        },
        printLog:  function (str){
            document.querySelector(".log").innerHTML=document.querySelector(".log").innerHTML+str+"<br>";
            return true;
        }
        
    }
})();


var displayChar=1;
function operation(key){
    var display=document.querySelector(".display").innerHTML;
    var result;
    switch (key){
        case "=" : {
            strLog=display;
            result=Math.round(calc.resolution(display)* 1000000000000000) / 1000000000000000;
            document.querySelector(".display").innerHTML=result;
            calc.printLog(strLog+"="+result); 
            displayChar=document.querySelector(".display").innerHTML.length;
            break;
         }
         case "c": {document.querySelector(".display").innerHTML=""; displayChar=0; break;}
         case "d": {document.querySelector(".display").innerHTML=display.substring(0, display.length - 1); displayChar--; break;}
         default :{
             if (displayChar<17){
                 displayRemoteControl(key);                
                 displayChar++;
             }
     }
  }  
}


displayRemote = function (event){
    if (event.target.parentNode.classList.contains("button")){        
        
        operation(event.target.parentNode.getAttribute("value"));
    }
    else {
            return false;
        }
}

function displayRemoteControl(value){
    var display=document.querySelector(".display");
    display.innerHTML=display.innerHTML+value;
}

window.onload=function (){
    document.querySelector(".panel-button").addEventListener("click", displayRemote);
    document.onkeypress=function(event){
        var number="0123456789+-*/().="
        if (number.indexOf(event.key)!=-1){
            operation(event.key);
        }

    }
    document.onkeydown=function(event){
        switch (event.keyCode){
            case 13: { operation("="); break; }
            case 8:{ operation("d"); break; }
            case 46:{ operation("c"); break; }
        }
    }
}

