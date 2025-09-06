import { useState, FormEvent } from 'react';
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Level } from '../../../../models/ISession';
import { postSession } from '../../../../services/sessions';
import { toast } from 'react-toastify';

interface SessionFormType {
    sequenceId: number;
    name: string;
    speaker: string;
    duration: number;
    level: Level;
    abstract: string;
}

interface Props {
    id: number;
}

const AddSession = ( { id } : Props ) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<SessionFormType>({
        mode: 'all'
    });

    const addSession = async ( values : SessionFormType ) => {
        console.log( values );

        const session = {
            ...values,
            sequenceId: +values.sequenceId,
            duration: +values.duration,
            upvoteCount: 0,
            workshopId: id
        };

        // POST the new session information to create a new session
        try {
            const newSession = await postSession( session );
            toast.success('New session has been added');

            // navigate( `/workshops/${id}` );
            navigate( '..' );
        } catch(error) {
            toast.error((error as Error).message);
        }
    };

    const validateDurationAndLevel = () => {
        const duration = +getValues('duration');
        const level = getValues('level');

        if( level === 'Basic' && duration < 1 ) {
            return 'Basic level should have minimum 1 hour duration';
        }

        if( level === 'Intermediate' && duration < 2 ) {
            return 'Intermediate level should have minimum 2 hours duration';
        }

        if( level === 'Advanced' && duration < 3 ) {
            return 'Advanced level should have minimum 3 hours duration';
        }
    };

    return (
        <div>
            <h1 className="d-flex justify-content-between align-items-center">
                Add a Session
                <Link to=".." className="btn btn-primary">List of sessions</Link>
            </h1>

            <hr />

            {/* handleSubmit() returns the actual event handler. This handler is called only when form is valid, and it also prevents the browser form submission */}
            {/*
                // if registered input has an error -> then a property exists in errors object
                errors -> {
                    "sequenceId"
                }
            */}
            <Form onSubmit={handleSubmit(addSession)}>
                <Form.Group className="mb-4" controlId="sequenceId">
                    <Form.Label>Sequence ID</Form.Label>
                    <Form.Control
                        {...register('sequenceId', { required: true, pattern: /^\d+$/ })}
                        type="number"
                        name="sequenceId"
                        placeholder="The Sequence ID of the session (eg. 1, 2, 3...)"
                    />
                    {
                        errors.sequenceId && (
                            <div className="text-danger">
                                {
                                    errors.sequenceId?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.sequenceId?.type === 'pattern' && (
                                        <div>Sequence ID must be a positive integer</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        {...register('name', { required: true, pattern: /^[A-Za-z\d][A-Za-z\d .,'&_\/:+#@-]*$/ })}
                        type="text"
                        placeholder="Name of the session, Eg. Introduction to Programming"
                    />
                    {
                        errors.name && (
                            <div className="text-danger">
                                {
                                    errors.name?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.name?.type === 'pattern' && (
                                        <div>Name of the session has characters that are not allowed - Must begin with alphanumeric, and can have alphanumeric, spaces, and these characters only - .,'&_/:+#@-</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="speaker">
                    <Form.Label>Speaker</Form.Label>
                    <Form.Control
                         {...register('speaker', { required: true, pattern: /^[A-Za-z][A-Za-z ]*(,\s*[A-Za-z][A-Za-z ]*)*$/ })}
                        type="text"
                        placeholder="Name of the speaker(s). Eg. John Doe, Jane Doe"
                    />
                    {
                        errors.speaker && (
                            <div className="text-danger">
                                {
                                    errors.speaker?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.speaker?.type === 'pattern' && (
                                        <div>Comma-separated name(s) of speaker(s)</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="duration">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        {...register(
                            'duration',
                            {
                                required: true,
                                pattern: /^\d+(\.\d+)?$/,
                                validate : validateDurationAndLevel
                            }
                        )}
                        type="text"
                        placeholder="The duration of the session in hours (eg. 2.5)"
                    />
                    {
                        errors.duration && (
                            <div className="text-danger">
                                {
                                    errors.duration?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.duration?.type === 'pattern' && (
                                        <div>Only number with optional decimal part allowed</div>
                                    )
                                }
                                {
                                    errors.duration?.type === 'validate' && (
                                        <div>The duration in insufficient for the selected level</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="level">
                    <Form.Label>Level</Form.Label>
                    <Form.Select
                        {...register(
                            'level',
                            {
                                required: true,
                                validate: validateDurationAndLevel
                            })}
                        aria-label="Level"
                    >
                        <option disabled>-- Select the level --</option>
                        <option value="Basic">Basic</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                    </Form.Select>
                    {
                        errors.level && (
                            <div className="text-danger">
                                {
                                    errors.level?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.level?.type === 'validate' && (
                                        <div>The duration in insufficient for the selected level</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>
                <Form.Group className="mb-4" controlId="abstract">
                    <Form.Label>Abstract</Form.Label>
                    <Form.Control
                        {...register('abstract', { required: true, minLength: 20, maxLength: 1024 })}
                        as="textarea"
                        rows={3}
                    />
                    {
                        errors.abstract && (
                            <div className="text-danger">
                                {
                                    errors.abstract?.type === 'required' && (
                                        <div>This field is required</div>
                                    )
                                }
                                {
                                    errors.abstract?.type === 'minLength' && (
                                        <div>Minimum 20 characters needed</div>
                                    )
                                }
                                {
                                    errors.abstract?.type === 'maxLength' && (
                                        <div>Maximum 1024 characters allowed</div>
                                    )
                                }
                            </div>
                        )
                    }
                </Form.Group>

                <Button type="submit">Add a session</Button>
            </Form>
        </div>
    );
}

export default AddSession;