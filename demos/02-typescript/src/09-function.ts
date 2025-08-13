type NS = number | string;

// syntax 1
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

// syntax 2 (expression-sytyle function defintions)
type BinaryFunction = ( a : number, b : number ) => number;

const subtract : BinaryFunction = function( x, y ) {
    return x - y;
};

const multiply : BinaryFunction = ( x, y ) => x * y;

// When we pass a function as an argument to another function (when we have callback functions)
type AjaxCalbackFunction = ( result : string ) => void;

function ajax( url : string, callback : AjaxCalbackFunction ) {
    // ...
}

ajax(
    'http://someurl.com/api/data',
    function( result ) {
        console.log( result );
        // return 123;
    }
)