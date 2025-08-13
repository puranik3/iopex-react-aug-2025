type MapperFunction<T, U> = ( x : T ) => U;

function map<T, U>( arr: T[], mapper : MapperFunction<T, U> ) {
    const result : U[] = [];

    for ( let i = 0; i < arr.length; ++i ) {
        result.push( mapper( arr[i] ) );
    }

    return result;
}

const squares = map( [ 1, 2, 3, 4 ], x => x * x );
const numChars = map( [ 'Monday', 'Tuesday', 'Wednesday' ], d => d.length );
const firstChars = map( [ 'Monday', 'Tuesday', 'Wednesday' ], d => d.charAt(0) );

// squares.push( 'Twenty Five' ); // not ok
squares.push( 25 ); // ok

console.log( squares );
console.log( numChars );
console.log( firstChars );