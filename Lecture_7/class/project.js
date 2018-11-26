class Projects{
    constructor(name, cost, stringCode, maxDev){
        this.name=name;
        this.cost=cost;
        this.stringCode=stringCode;
        this.status = false;
        this.statusEnd = false;
        this.progress=0;
        this.startCost=cost;
        this.maxDev=maxDev;
    }

    setStatus (status){
        this.status=status;
    }

    setStatusEnd (statusEnd){
        this.statusEnd=statusEnd;
    }
    
    setProgress (lines, cost){
        if (this.cost>=cost){
            this.progress+=lines;
            this.cost-=cost;
            return true;
        }
        return false; 
    }
    
    getFreeCach (){
       return this.startCost-this.cost;
    }
    
    Test (){
        if (this.progress>=this.stringCode){
            this.status=true;
            this.statusEnd=true;
            return true;
        }
        return false;
    }
}



