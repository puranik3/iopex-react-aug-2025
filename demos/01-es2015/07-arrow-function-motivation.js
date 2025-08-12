const payroll = {
    // properties
    employees: [
        { name: 'John', dept: 'IT', salary: 1000 },
        { name: 'Maria', dept: 'Finance', salary: 2000 },
        { name: 'David', dept: 'Finance', salary: 3000 }
    ],
    hikePercentage: {
        IT : 10,
        Finance: 20
    },

    // methods
    raise: function() { // raise() function is a method of payroll object
        console.log( 'this [1]', this );

        this.employees.forEach(
            // function ( employee ) { // this function is NOT a method of payroll object

            // Arrow functions do not have their own "this" -> they use the "this" which is in the scope
            ( employee ) => { // this function is NOT a method of payroll object
                console.log( 'this [2]', this );

                const dept = employee.dept;

                const salary = employee.salary;
                const hikePercentage = this.hikePercentage[dept];

                employee.salary = ( ( 100 + hikePercentage ) / 100 ) * salary;
            }
        );
    }
}

payroll.raise();
console.log( payroll.employees );