function Managers(firstname, lastname, experience, salary){
    Employees.call(this, firstname, lastname, salary);
    this.experience = experience;
    this.status=false;
    this.project=null;
    this.dev=[];
}

Managers.prototype=Object.create(Employees.prototype);
Managers.prototype.constructor=Managers;

Managers.prototype.setProject=function(project){
    this.project=project;
    this.status=true;
}

Managers.prototype.delProject=function(){
    this.project=null;
    this.status=false;
}

Managers.prototype.addDev = function(dev){
    this.dev.push(dev);
}

Managers.prototype.addDevs = function(devs){
    devs.forEach(dev => {
        if (dev.status===false){
            this.dev.push(dev);
        }
    });
}

Managers.prototype.DelDevs = function(){
    this.dev.forEach(devItem => {
        devItem.status=false;        
    });
    this.dev=[];    
}

Managers.prototype.getStringCode = function(){
    var resultLines=0;
    var many=0;
    for (var dev=0; dev<this.dev.length; dev++){
        resultLines=this.dev[dev].getStringCodeDev()+resultLines;
        many=Number(this.dev[dev].getSalary())+Number(many);
    }
    resultLines*=this.experience;
    return {Lines: resultLines, Many: many};
}