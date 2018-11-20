function Employees(firstname, lastname, salary){
    this.firstname=firstname;
    this.lastname=lastname;
    if (salary===undefined){
        this.salary=10;
        }
        else{
            this.salary=salary;
        } 
}