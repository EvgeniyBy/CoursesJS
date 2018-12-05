class Managers extends Employees{
    constructor(firstname, lastname, experience, salary){
        super (firstname, lastname, salary)
        this.experience = experience;
        this.status=false;
        this.project=null;
        this.dev=[];
    }
    
    set Project (project){
        this.project=project;
        this.status=true;
    }
    
    delProject (){
        this.project=null;
        this.status=false;
    }
    
    addDev  (dev){
        this.dev.push(dev);
    }
    
    addDevs  (devs){
        devs.forEach(dev => {
            if (dev.status===false){
                this.dev.push(dev);
            }
        });
    }
    
    DelDevs  (){
        this.dev.forEach(devItem => {
            devItem.status=false;        
        });
        this.dev=[];    
    }
    
    get StringCode (){
        let resultLines=0;
        let many=0;
        for (let dev=0; dev<this.dev.length; dev++){
            resultLines=this.dev[dev].StringCodeDev+resultLines;
            many=Number(this.dev[dev].Salary+Number(many));
        }
        resultLines*=this.experience;
        return {Lines: resultLines, Many: many};
    }
}


