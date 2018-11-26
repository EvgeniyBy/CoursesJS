class Developers  extends Employees{
    constructor (firstname, lastname, salary, level){
        super(firstname, lastname, salary);
        if (level===undefined){
            this.level="junior";
            }
            else{
                this.level=level;
            };    
            
        this.status=false;
    }

    setWork (){
        this.status=true;
    }
    
    delWork (){
        this.status=false;
    }
    
    upLevel (){
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
    
    get StringCodeDev (){
        switch (this.level){
            case "junior": return 50;
            case "middle": return 100;
            case "senior": return 150;
            default: return 0;
        }
    }
    
    get Salary (){
        return this.salary;
    }
}


