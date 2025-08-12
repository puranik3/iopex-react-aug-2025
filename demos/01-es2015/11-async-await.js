function sumAsync( x, y ) {
    return new Promise(
        ( resolve, reject ) => {
            if ( typeof x !== 'number' || typeof y !== 'number' ) {
                reject( new Error( 'one of the arguments is not a number' ) );
                return;
            }

            setTimeout(
                () => resolve( x + y ),
                3000
            );
        }
    );
}

const doSerialOps = async () => {
    console.log( 3 );

    try {
        const result1 = await sumAsync(1, 2); // Hey Node JS! Go ahead and do anything else you have to do
        console.log( 4 );

        console.log( 'result1 = ', result1 );

        const result2 = await sumAsync( result1, 3 );
        console.log( 'result2 = ', result2 );

        const result3 = await sumAsync( result2, 4 );
        console.log( 'result3 = ', result3 );

        return result3;
    } catch( error ) {
        console.log( error.message );
    }
};

console.log( 1 );
doSerialOps().then( result => console.log( 'final result = ', result ))
console.log( 2 );

// Normally: 1 3 4 2