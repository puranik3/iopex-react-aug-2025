import { useState, useEffect} from 'react';

import Item from './Item/Item';
import LoadingSpinner from '../../common/LoadingSpinner/LoadingSpinner';

import { getWorkshops } from '../../../services/workshops';
import IWorkshop from '../../../models/IWorkshop';
import ErrorAlert from '../../common/ErrorAlert/ErrorAlert';

import { useSearchParams } from "react-router-dom";

const WorkshopsList = () => {
    // --- Workshops state, workshops filtering and other logic ---
    const [ workshops, setWorkshops ] = useState<IWorkshop[]>( [] );
    const [ filteredWorkshops, setFilteredWorkshops ] = useState<IWorkshop[]>( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState<Error | null>( null );

    const [ filterKey, setFilterKey ] = useState( '' );

    useEffect(
        () => {
            setFilteredWorkshops(
                workshops.filter( w => w.name.toUpperCase().includes( filterKey.toUpperCase() ) )
            )
        },
        [ workshops, filterKey ]
    );
    // ------------------------------------------------------------


    // ---------------- Pagination state and logic ----------------
    // const [ page, setPage ] = useState( 1 );
    const [ lastPage, setLastPage ] = useState( false );

    const [ searchParams, setSearchParams ] = useSearchParams();
    const page = +(searchParams.get("page") || "1") // "1" -> 1
    const category = searchParams.get("category") || "";

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
                    const workshops = await getWorkshops( page, category );
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
        [ page, category ] // dependencies array
    );

    const previous = () => {
        if ( page === 1 ) {
            return;
        }

        // if the new state depends on the current state, use the function form of the setter
        // setPage( p => p - 1 );
        setSearchParams({
            page: '' + ( page - 1 )
        });
    };

    const next = () => {
        if ( lastPage ) {
            return;
        }

        // setPage( p => p + 1 );
        setSearchParams({
            page: '' + ( page + 1 )
        });
    };
    // ------------------------------------------------------------

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

            <div>
                <div className="btn-group my-3" role="group" aria-label="Filter by category">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setSearchParams({ category: '' })}
                    >
                        All
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setSearchParams({
                            category: 'frontend'
                        })}
                    >
                        Frontend
                    </button>
                    <button type="button" className="btn btn-warning" onClick={() => setSearchParams({ category: 'backend' })}>Backend</button>
                    <button type="button" className="btn btn-success" onClick={() => setSearchParams({ category: 'devops' })}>Devops</button>
                    <button type="button" className="btn btn-info" onClick={() => setSearchParams({ category: 'language' })}>Language</button>
                    <button type="button" className="btn btn-light" onClick={() => setSearchParams({ category: 'mobile' })}>Mobile</button>
                    <button type="button" className="btn btn-dark" onClick={() => setSearchParams({ category: 'database' })}>Database</button>
                </div>
            </div>

            <div>
                <input
                    type="search"
                    className="form-control"
                    placeholder="Type to search by name"
                    value={filterKey}
                    onChange={( event ) => setFilterKey( event.target.value )}
                />

                <button onClick={() => setFilterKey('')}>Reset filter</button>

                <div>
                    Workshops whose name has
                    <span className="text-primary"> {filterKey} </span> are shown.
                </div>
            </div>

            {loading && <LoadingSpinner />}

            {!loading && error && <ErrorAlert error={error} />}

            {
                !loading && !error && (
                    <div className="row">
                        {
                            filteredWorkshops.map(
                                workshop => (
                                    <div className="col col-3 d-flex my-3" key={workshop.id}>
                                        <Item
                                            workshop={workshop}
                                        />
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