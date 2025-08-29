import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";

import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../../common/ErrorAlert/ErrorAlert";

import { getSessionsForWorkshop } from "../../../../services/sessions";
import ISession from "../../../../models/ISession";

interface Props {
    id: number
}

const SessionsList = ( { id } : Props ) => {
    const [loading, setLoading] = useState(true);
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const sessions = await getSessionsForWorkshop(id);

                    setLoading(false);
                    setSessions(sessions);
                } catch (error) {
                    setLoading(false);
                    setError(error as Error);
                }
            };

            helper();
        },
        [id]
    );

    return (
        <div>
            <h2>List of Sessions</h2>

            <hr />

            {loading && (
                <LoadingSpinner />
            )}

            {!loading && error && (
                <ErrorAlert error={error} />
            )}

            {!loading && !error && (
                <ListGroup>
                    {sessions.map((s, idx) => (
                        <ListGroup.Item key={s.id}>
                            <Row>
                                <Col
                                    xs={1}
                                    className="d-flex flex-column justify-content-center align-items-center"
                                >
                                    {/* @todo voting widget */}
                                    {s.upvoteCount}
                                </Col>
                                <Col xs={11}>
                                    <h3>{ s.name }</h3>
                                    <div>by { s.speaker }</div>
                                    <div>{ s.level }</div>
                                    <div>{ s.duration }</div>
                                    <div>{ s.abstract }</div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
};

export default SessionsList;