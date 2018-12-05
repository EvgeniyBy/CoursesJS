class Company{
    constructor (name, materials){
        this.name=name;
        this.materials=materials;
        this.arrDevs=[];
        this.arrManagers=[];
        this.arrProjects=[];
        this.cashBack=1.5;          //коэфиц. прибыли
    }


    addDev (fname, lname, salary, level){
        this.arrDevs.push ( new Developers(fname, lname, salary, level));
    }
    
    addManager (firstname, lastname, experience, salary){
        this.arrManagers.push(new Managers(firstname, lastname, experience, salary));
    }
    
    addProject (name, cost, stringCode, maxDev){
        this.arrProjects.push (new Projects(name, cost, stringCode, maxDev));
    }
    
    get Devs (){
        return this.arrDevs;
    }
    
    get Managers (){
        return this.arrManagers;
    }
    
    get Projects (){
        return this.arrProjects;
    }
    
    addManagerProject (){    //назначается менеджер на проект
        for (let i=0; i<this.arrProjects.length; i++){
            if (this.arrProjects[i].status || this.arrProjects[i].statusEnd){            
                continue;
            }
            else{            
                for (let m=0; m<this.arrManagers.length; m++){
                    if (!this.arrManagers[m].status){
                        this.arrManagers[m].Project=this.arrProjects[i];
                        this.arrProjects[i].setStatus(true);
                        break;
                    }
                }
            }
        }
    }
    
    addManagerDevs (){  //назначяются разработчики
        for (let i=0; i<this.arrManagers.length; i++){
            if ((this.arrManagers[i].status) && (this.arrManagers[i].project.maxDev>this.arrManagers[i].dev.length)){            
                for (let m=0; m<this.arrDevs.length; m++){
                    if ((!this.arrDevs[m].status)&&(this.arrManagers[i].project.maxDev>this.arrManagers[i].dev.length)){
                        this.arrManagers[i].addDev(this.arrDevs[m]);
                        this.arrDevs[m].setWork();
                    }
                }
            } 
        }
    }
    
    bussinesProces (){
        viewDev();
        viewManager();
        viewProj();
        this.addManagerProject();
        this.addManagerDevs();
        let result={};
        let progress;
        let dolg=0;
        let cost=0;    
        for (let man=0; man<this.arrManagers.length; man++){
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
                result=this.arrManagers[man].StringCode;   //{количество строк и их стоимость}
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
}

