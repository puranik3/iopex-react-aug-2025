/*export default */interface IPerson {
    readonly name: string,
    age: number,
    spouse?: string,
    celebrateBirthday: ( inc : number ) => void
}

// export type {
//     IPerson
// }

// 1. data type for an object
let john : IPerson;
john = {
    name: 'John',
    age: 32,
    celebrateBirthday( inc : number ) {
        this.age += inc;
    }
};

// john.name = 'Jonathan'; // error since name is readonly

// 2. contract for a class (class concept exists in JS)
class Person implements IPerson {
    readonly name: string;
    age: number;
    spouse?: string = 'NA';

    constructor( name : string, age: number, spouse? : string ) {
        this.name = name;
        this.age = age;

        if ( spouse ) {
            this.spouse = spouse;
        }
    }

    celebrateBirthday( inc : number = 1 ) {
        this.age += inc;
    }
}

const jane = new Person( 'Jane Doe', 28, 'John Doe' );
jane.celebrateBirthday();
console.log( jane );

class Robot implements IPerson {
    readonly name: string = 'IRobot';
    age: number = 30;
    spouse?: string = 'NA';

    celebrateBirthday( inc : number = 1 ) {
        this.age += inc;
    }
}

function increaseAges( persons : IPerson[] ) {
    for ( let person of persons ) {
        person.celebrateBirthday( 1 );
    }
}

const irobot2 = new Robot();

const persons = [
    jane,
    irobot2
];

increaseAges( persons );
console.log( persons );

// default export is the main export from a module
// You can have only 1 default export
export type {
    IPerson as default,
    increaseAges
}