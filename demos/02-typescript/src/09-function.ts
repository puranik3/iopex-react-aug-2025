type NS = number | string;

// the data type of returned value is inferred
function sum( x : NS, y : NS ) /*: number */ {
    // type narrowing
    let numX : number;

    if ( typeof x === 'string' ) {
        numX = +x; // convert from string to number
    } else {
        numX = x;
    }

    let numY : number;

    if ( typeof y === 'string' ) {
        numY = +y; // convert from string to number
    } else {
        numY = y;
    }

    return numX + numY;
}

const result = sum( 1, 2 );
sum( "1", 2 );
sum( 1, "2" );
sum( "1", "2" );