// default export when imported is to be mentioned outside braces
import type IHuman from './10-interface-class';
import type { increaseAges } from './10-interface-class';

const jane : IHuman = {
    name: 'Jane Doe',
    age: 28,
    celebrateBirthday( inc : number ) {
        this.age += inc;
    }
}

interface IEmployee extends IHuman {
    role: string;
    department: string;

    promote: (newRole: string) => void;
}

const john: IEmployee = {
    // IHuman properties
    name: "John",
    age: 30,
    spouse: "Jane Doe",

    // IEmployee properties
    role: "Software Engineer",
    department: "Engineering",

    // methods
    // IHuman-specific
    celebrateBirthday: function () {
        this.age++;
    },

    // IEmpoyee-specific
    promote: function (newRole: string) {
        this.role = newRole;
    }
}