var _=(function(value) {
    var autor = "Evgeniy Borzov";
    return {
            undefinedCheck:function(value){ return value===undefined},  //проверка на undefined

            nullCheck:function(value){ return value===null},            //проверка на null

            nanCheck:function(value){ return isNaN(value)},             //проверка на NaN 

            randomInt:function(start, end){                             //случайное число в диапазоне [start, end]
                var distance=end+1-start;
                return Math.floor(Math.random()*distance+start);
            },
            
            getAutor:function(){return autor;},


            /* object */

            copyObj:function(inObj){               // копирование объекта (принимает объект)
                var newObj={};
                for(var element in inObj){
                    if (inObj[element]===null){
                        newObj[element]=inObj[element];
                        continue;
                    }
                    if (typeof(inObj[element])!="object"){                    
                        newObj[element]=inObj[element];
                        }
                    else {                        
                        newObj[element]=this.copyObj(inObj[element]);
                        }
                    };
                return newObj;
            },

            mapObj:function(inObj, inFunc){               // map  (принимает объект и функцию обработки)
                var newObj={};                
                for(var element in inObj){
                    if (inObj[element]===null){
                        newObj[element]=inFunc(inObj[element]);
                        continue;
                    }
                    if (typeof(inObj[element])!="object"){                    
                        newObj[element]=inFunc(inObj[element]);
                        }
                    else {                        
                        newObj[element]=this.copyObj(inObj[element]);
                        }
                    };
                return newObj;
            },

            deletePropertyOdj:function(inObj, inFunc){               // удалить свойство (принимает объект и функцию проверки)
                var newObj={};                
                for(var element in inObj){
                    if (inObj[element]===null){
                        if (inFunc(inObj[element])){
                            newObj[element]=inObj[element];
                        }
                        continue;
                    }
                    if (typeof(inObj[element])!="object"){                    
                        if (inFunc(inObj[element])){
                            newObj[element]=inObj[element];
                            }
                        }
                    else {                        
                        newObj[element]=this.deletePropertyOdj(inObj[element], inFunc);
                        }
                    };
                return newObj;
            }
        }
    })();