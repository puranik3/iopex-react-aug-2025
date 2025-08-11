/**
 *
 * Callback pattern -> used wherever some operation is started immediately, but the result is available asynchronously (after some time)
 */
function sumAsync( x, y, cb ) {
    // Hey Node JS / browser! Can you please execute f when you get time AFTER 3 seconds
    // setTimeout is non-blocking - IT WILL NO WAIT for Node JS to execute f. It returns immediately.
    setTimeout(
        () => {
            // return x + y;
            cb( x + y );
        }, // f
        3000
    );

    console.log( 'after setTimeout completed' );

    // return undefined;
}

const result = sumAsync( 1, 2, ( result ) => {
    console.log( 'result = ', result );
});
console.log( result );