import type IPerson from "./10-interface-class";

class Person implements IPerson {
    readonly name: string;
    age: number;
    spouse?: string = 'NA';

    // private emails : string[];

    constructor( name : string, age: number, private emails : string[], spouse? : string ) {
        this.name = name;
        this.age = age;
        // this.emails = emails;

        if ( spouse ) {
            this.spouse = spouse;
        }
    }

    celebrateBirthday( inc : number = 1 ) {
        this.age += inc;
        // this.emails  = [];
    }
}

const jane = new Person( 'Jane Doe', 28, [ 'jane@gmail.com' ], 'John Doe' );
jane.celebrateBirthday();
console.log( jane );
console.log( jane.age ); // age is public
// console.log( jane.emails ); // error - emails is private
