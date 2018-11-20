function Developers(firstname, lastname, salary, level){
    Employees.call(this, firstname, lastname, salary);
    if (level===undefined){
        this.level="junior";
        }
        else{
            this.level=level;
        };    
        
    this.status=false;
}

Developers.prototype=Object.create(Employees.prototype);
Developers.prototype.constructor=Developers;

Developers.prototype.setWork = function(){
    this.status=true;
}

Developers.prototype.delWork = function(){
    this.status=false;
}

Developers.prototype.upLevel = function(){
    if (this.level==="junior"){
        this.level="middle";
        return true;
    }
    if (this.level==="middle"){
        this.level="senior";
        return true;
    }
    return false;

}

Developers.prototype.getStringCodeDev = function (){
    switch (this.level){
        case "junior": return 50;
        case "middle": return 100;
        case "senior": return 150;
        default: return 0;
    }
}

Developers.prototype.getSalary = function (){
    return this.salary;
}