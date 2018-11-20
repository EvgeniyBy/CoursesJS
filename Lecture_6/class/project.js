function Projects(name, cost, stringCode, maxDev){
    this.name=name;
    this.cost=cost;
    this.stringCode=stringCode;
    this.status = false;
    this.statusEnd = false;
    this.progress=0;
    this.maxDev=maxDev;
}

Projects.prototype.setStatus = function(status){
    this.status=status;
}

Projects.prototype.setStatusEnd = function(statusEnd){
    this.statusEnd=statusEnd;
}

Projects.prototype.setProgress = function (lines, cost){
    if (this.cost>=cost){
        this.progress+=lines;
        this.Test();
        return true;
    }
    return false; 
}

Projects.prototype.Test = function(){
    if (this.progress>=this.stringCode){
        this.status=true;
        this.statusEnd=true;
    }
}