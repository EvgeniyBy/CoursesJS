var company = {};

function companyPar(){
    document.querySelector(".progress .company .name").innerHTML=
    document.querySelector(".setting .contora .name").value;
    document.querySelector(".progress .company .babki").innerHTML=
    document.querySelector(".setting .contora .babki").value;
    company = new Company(document.querySelector(".setting .contora .name").value, 
    document.querySelector(".setting .contora .babki").value);
}

document.querySelector(".setting .contora .set").addEventListener("click",
companyPar);



document.querySelector(".setting .manager .add").addEventListener("click",
    function(){
        var fname = document.querySelector(".setting .manager .fname").value;
        var lname = document.querySelector(".setting .manager .lname").value;
        var many = document.querySelector(".setting .manager .many").value;
        var experience = document.querySelector(".setting .manager .experience").value;
        company.addManager(fname, lname, experience, many);
        viewManager();
});

document.querySelector(".setting .developer .add").addEventListener("click",
    function(){
        var fname = document.querySelector(".setting .developer .fname").value;
        var lname = document.querySelector(".setting .developer .lname").value;
        var many = document.querySelector(".setting .developer .many").value;
        var select = document.querySelector(".setting .developer .level");
        var level= select.options[select.selectedIndex].value;
        company.addDev(fname, lname, many, level);
        viewDev();
});

document.querySelector(".setting .project .add").addEventListener("click",
    function(){
        var name = document.querySelector(".setting .project .name").value;
        var cost = document.querySelector(".setting .project .cost").value;
        var stringCode = document.querySelector(".setting .project .stringCode").value;
        var maxDev = document.querySelector(".setting .project .maxDev").value;
        company.addProject(name, cost, stringCode,maxDev);
        viewProj();
});

function viewDev(){
    var htmltext="";
    company.arrDevs.forEach(function(item, i) {
        htmltext+="<option value="+ i +">" + item.firstname+' '+item.lastname+' '+
        item.level+' '+item.status+"</option>";
      });
    document.querySelector(".progress .developer .list").innerHTML=htmltext;
}

function viewManager(){
    var htmltext="";
    company.arrManagers.forEach(function(item, i) {
        htmltext+="<option value="+ i +">" + item.firstname+' '+item.lastname
        +' '+item.experience+' '+item.status+"</option>";
      });
    document.querySelector(".progress .manager .list").innerHTML=htmltext;
}

function viewProj(){
    var htmltext="";
    var statusTrue="";
    company.arrProjects.forEach(function(item, i) {
        statusTrue="";
        if (item.statusEnd){ statusTrue = " Выполнен";}
        htmltext+='<div class="item proj_'+i+'"><div class="param"><span>Название </span><span class="title">'+
        item.name+' '+statusTrue+'</span><br><span>Бюджет </span><span class="babki">'+item.cost+
        '</span><br><span>Цель </span><span class="strcode">'+item.stringCode+
        '</span></div></div><div class="process"><span>Выполненно </span><span class="work">' + item.progress + '</span><br>'+
        '<span>Потрачено </span><span class="babki">' + item.getFreeCach() + '</span></div>';
      });
    document.querySelector(".progress .project").innerHTML=htmltext;
}

    document.querySelector(".progress .manager .del").addEventListener("click",
    function(){
        delete company.arrManagers[document.querySelector(".progress .manager .list").value];
        viewManager();
    });

    document.querySelector(".progress .developer .del").addEventListener("click",
    function(){
        delete company.arrDevs[document.querySelector(".progress .developer .list").value];
        viewDev();
    });

    document.querySelector(".progress .developer .up").addEventListener("click",
        function(){
            company.arrDevs[document.querySelector(".progress .developer .list").value].upLevel();
            viewDev(); 
        });

    function printLog(str){
        document.querySelector(".textout").value=document.querySelector(".textout").value+'\n'+str;
    }


var id;

    document.querySelector(".start").addEventListener("click",
    function(){        
        
        id=StartStop().start();
        printLog('Начали');
    });

    document.querySelector(".stop").addEventListener("click",
    function(){
        StartStop().stop(id);
    });

    var StartStop=(function(){
        return {
            start: function(){
                return setInterval(function(){
                    company.bussinesProces();}, 2000);
            },
            stop: function(id){
                clearInterval(id);                
            }
        }
    })