import { useState, FormEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddSession = () => {
    const [ sequenceId, setSequenceId ] = useState('');
    const [ name, setName ] = useState('');
    const [ speaker, setSpeaker ] = useState('');
    const [ duration, setDuration ] = useState('');
    const [ level, setLevel ] = useState('Basic');
    const [ abstract, setAbstract ] = useState('');

    const addSession = ( event : FormEvent ) => {
        // we don't want the browser to submit the form
        event.preventDefault();

        console.log( sequenceId );
        console.log( level );
    };

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">List of sessions</Link>
            </h1>

            <hr />

            <Form onSubmit={addSession}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        value={sequenceId}
                        onChange={( event ) => setSequenceId( event.target.value )}
                        type="number"
                        name="sequenceId"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={name}
                        onChange={( event ) => setName( event.target.value )}
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        value={speaker}
                        onChange={( event ) => setSpeaker( event.target.value )}
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        value={duration}
                        onChange={( event ) => setDuration( event.target.value )}
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        value={level}
                        onChange={( event ) => setLevel( event.target.value )}
                        aria-label="Level"
                    >
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        value={abstract}
                        onChange={( event ) => setAbstract( event.target.value )}
                        as="textarea"
                        rows={3}
                    />
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
}

export default AddSession;