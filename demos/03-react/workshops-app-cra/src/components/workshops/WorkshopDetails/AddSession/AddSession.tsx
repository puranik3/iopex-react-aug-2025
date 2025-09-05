import { useRef, FormEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddSession = () => {
    const sequenceIdRef = useRef<HTMLInputElement>(null); // { current: null }
    const nameRef = useRef<HTMLInputElement>(null);
    const speakerRef = useRef<HTMLInputElement>(null);
    const durationRef = useRef<HTMLInputElement>(null);
    const levelRef = useRef<HTMLSelectElement>(null);
    const abstractRef = useRef<HTMLTextAreaElement>(null);

    const addSession = ( event : FormEvent ) => {
        // we don't want the browser to submit the form
        event.preventDefault();

        console.log( sequenceIdRef.current?.value );
        console.log( levelRef.current?.value );
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
                        ref={sequenceIdRef}
                        type="number"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        ref={nameRef}
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                        ref={speakerRef}
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        ref={durationRef}
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                    />
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        ref={levelRef}
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
                        ref={abstractRef}
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