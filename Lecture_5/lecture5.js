var modul = (function(){

    function requestUrl(url) {
        return new Promise((res, rej) => {
            const delayTime = Math.floor(Math.random() * 10000) + 1;    
            setTimeout(() => res(url), delayTime);
          });
    }

    return {        
        debounce: function (funcSet, timeSet){      //debounce
            var idTimer=null;            
            return function(){  
                var arg=arguments;            
                if (idTimer!=null){clearTimeout(idTimer);}                                  
                idTimer = setTimeout(function () {                        
                        funcSet.apply(null,arg);
                        idTimer=null;
                    }, timeSet);            
                }                  
        },    
        
        setTimeoutPromise: function(timer){    // setTimeout promise
            return new Promise(function(resolve) {                
                setTimeout(resolve, timer, timer);
                }                
            )        
        },
        
        ajax: function(method,url, timeout, user, password){
            return new Promise(function(resolve, reject){
                var request = new XMLHttpRequest();
                request.open(method, url, true, user ,password);
                request.timeout = timeout;
                request.onload = function(){
                    if (this.status==200){
                        resolve(this.response);
                    }
                    else{
                        reject('Ошибка '+this.status + ' для '+url);
                    }
                };
                request.onerror = function() {
                    reject("Ошибка подключения!");
                  }; 
                request.ontimeout = function(){
                    reject("Истекло время подключения!");
                }             
                request.send();  
            })
        }, 

        urlsPromise:function(urls){
            return new Promise((resolve, reject) => {
                var result = [];
                var arrPromise = urls.map(requestUrl);                        
                arrPromise.forEach(element => {            
                    element.then(param => {
                        result.push(param);            
                        if (arrPromise.length==result.length) {
                            resolve(result)
                        }
                    });
            
                });
            });        
        }
    }    
})()

