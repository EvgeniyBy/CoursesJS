function Company (name, materials){
    this.name=name;
    this.materials=materials;
    this.arrDevs=[];
    this.arrManagers=[];
    this.arrProjects=[];
    this.cashBack=1.5;          //коэфиц. прибыли
}

Company.prototype.addDev = function (fname, lname, salary, level){
    this.arrDevs.push ( new Developers(fname, lname, salary, level));
}

Company.prototype.addManager = function(firstname, lastname, experience, salary){
    this.arrManagers.push(new Managers(firstname, lastname, experience, salary));
}

Company.prototype.addProject = function(name, cost, stringCode, maxDev){
    this.arrProjects.push (new Projects(name, cost, stringCode, maxDev));
}

Company.prototype.getDevs = function(){
    return this.arrDevs;
}

Company.prototype.getManagers = function(){
    return this.arrManagers;
}

Company.prototype.getProjects = function(){
    return this.arrProjects;
}

Company.prototype.addManagerProject = function(){    //назначается менеджер на проект
    for (var i=0; i<this.arrProjects.length; i++){
        if (this.arrProjects[i].status || this.arrProjects[i].statusEnd){            
            continue;
        }
        else{            
            for (var m=0; m<this.arrManagers.length; m++){
                if (!this.arrManagers[m].status){
                    this.arrManagers[m].setProject(this.arrProjects[i]);
                    this.arrProjects[i].setStatus(true);
                    break;
                }
            }
        }
    }
}

Company.prototype.addManagerDevs = function(){  //назначяются разработчики
    for (var i=0; i<this.arrManagers.length; i++){
        if ((this.arrManagers[i].status) && (this.arrManagers[i].project.maxDev>this.arrManagers[i].dev.length)){            
            for (var m=0; m<this.arrDevs.length; m++){
                if ((!this.arrDevs[m].status)&&(this.arrManagers[i].project.maxDev>this.arrManagers[i].dev.length)){
                    this.arrManagers[i].addDev(this.arrDevs[m]);
                    this.arrDevs[m].setWork();
                }
            }
        } 
    }
}

Company.prototype.bussinesProces = function(){
    viewDev();
    viewManager();
    viewProj();
    this.addManagerProject();
    this.addManagerDevs();
    var result={};
    var progress;
    var dolg=0;
    var cost=0;    
    for (var man=0; man<this.arrManagers.length; man++){
        if (this.materials<=0){
            printLog("Компания без денег! Долг ="+dolg);
            StartStop().stop(id);
            return 0;
        }
        if (this.arrManagers[man].status){
            if (this.arrManagers[man].project.statusEnd){  
                this.arrManagers[man].status=false;
                this.arrManagers[man].DelDevs();
                continue;
            }
            result=this.arrManagers[man].getStringCode();   //{количество строк и их стоимость}
            cost=result['Many']*this.cashBack;   //сумма которую рвём с проекта
            if (cost<=this.arrManagers[man].project.cost){
                if (this.materials>result['Many']) {
                    this.materials-=result['Many'];
                }
                else{
                    dolg+=result['Many'];
                }

                progress=this.arrManagers[man].project.setProgress(result['Lines'], cost);
                if (progress){
                    this.materials+=cost;
                    viewProj(); 
                    printLog("Проект "+this.arrManagers[man].project.name + ': строк написано ' + result['Lines']+'; З/п разрабов '+ result['Many']+
                    '; компания получила ' + cost);
                    printLog("Бабло компании "+ this.materials);
                    if (this.arrManagers[man].project.Test()){
                        printLog("Проект выполнен - " + this.arrManagers[man].project.name);
                    }
                }               
            }      
            else{
                printLog("На проекте кончились деньги - "+ this.arrManagers[man].project.name);
            }
        }
    }
}