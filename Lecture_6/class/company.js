function Company (name, materials){
    this.name=name;
    this.materials=materials;
    this.arrDevs=[];
    this.arrManagers=[];
    this.arrProjects=[];
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

Company.prototype.addManagerProject = function(){    
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

Company.prototype.addManagerDevs = function(){
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
    var result={};
    var progress;
    for (var man=0; man<this.arrManagers.length; man++){
        if (this.arrManagers[man].status){
            if (this.arrManagers[man].project.statusEnd){continue;}
            result=this.arrManagers[man].getStringCode();
            progress=this.arrManagers[man].project.setProgress(result['Lines'], result['Many']);
            if (progress){ 
                console.log("мы заработали "+result['Lines']+' '+' '+ result['Many'] + ' '+this.arrManagers[man].project.name);
            }
            else{
                console.log("На проекте кончились деньги качаем с конторы "+ this.arrManagers[man].project.name);
            }
        }
    }
}