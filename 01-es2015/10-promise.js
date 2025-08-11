function sumAsync( x, y ) {
    return new Promise(
        ( resolve, reject ) => {
            setTimeout(
                () => resolve( x + y ),
                3000
            );
        }
    );
}

// then(), catch() are 2 important functions of a Promise object
sumAsync(1, 2)
    .then(
        ( result1 ) => {
            console.log( 'result1 = ', result1 );

            // sumAsync( result1, 3 )
            //     .then(
            //         ( result2 ) => {
            //             console.log( 'result2 = ', result2 );
            //         }
            //     );
            return sumAsync( result1, 3 );
        }
    )
    .then(
        ( result2 ) => {
            console.log( 'result2 = ', result2 );

            return sumAsync( result2, 4 )
        }
    )
    .then(
        ( result3 ) => {
            console.log( 'result3 =', result3 );
        }
    );