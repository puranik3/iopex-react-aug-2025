import { useState, useEffect} from 'react';
import { getWorkshops } from '../../../services/workshops';
import IWorkshop from '../../../models/IWorkshop';

const WorkshopsList = () => {
    const [ workshops, setWorkshops ] = useState<IWorkshop[]>( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState<Error | null>( null );
    const [ page, setPage ] = useState( 1 );
    const [ lastPage, setLastPage ] = useState( false );

    // how dependencies array works
    // [] -> effect function runs once (when component loads)
    // [ page, x ] -> effect function runs once when component loads + when page or x changes

    useEffect(
        // Warning: useEffect must not return anything besides a function, which is used for clean-up.
        // async function returns a Promise - effect function cannot be async
        // async () => { // effect
        () => { // effect
            const helper = async () => {
                setLoading( true );

                try {
                    const workshops = await getWorkshops( page );
                    setWorkshops( workshops );

                    if( workshops.length < 10 ) {
                        setLastPage( true );
                    }
                } catch( error ) {
                    setError( error as Error ); // type assertion
                }

                setLoading( false );
            };

            helper();

            // an effect function can return ONLY 1. nothing (undefined), or 2. a cleanup function
            // return () => {

            // };
        },
        [ page ] // dependencies array
    );

    const previous = () => {
        if ( page === 1 ) {
            return;
        }

        // if the new state depends on the current state, use the function form of the setter
        setPage( p => p - 1 );
    };

    const next = () => {
        if ( lastPage ) {
            return;
        }

        setPage( p => p + 1 );
    };

    return (
        <div className="container my-4">
            <h1>List of workshops</h1>
            <hr />

            {/* Add this */}
            <div className="my-4">
                <button className="btn btn-sm btn-primary me-2" onClick={previous} disabled={loading}>Previous</button>
                <button className="btn btn-sm btn-primary" onClick={next} disabled={loading}>Next</button>
                <div>You are viewing page {page}</div>
            </div>

            {
                loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }

            {
                !loading && error && (
                    <div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>
                )
            }

            {
                !loading && !error && (
                    <div className="row">
                        {
                            workshops.map(
                                workshop => (
                                    <div className="col col-3 d-flex my-3" key={workshop.id}>
                                        <div className="card p-3">
                                            <img src={workshop.imageUrl} className="card-img-top" alt={workshop.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{workshop.name}</h5>
                                                <p className="card-text">{workshop.startDate} - {workshop.endDate}</p>
                                                <a href="/" className="btn btn-primary">Know more</a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default WorkshopsList;