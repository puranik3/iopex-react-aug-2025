import { useCallback, useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { toast } from 'react-toastify';

import LoadingSpinner from "../../../common/LoadingSpinner/LoadingSpinner";
import ErrorAlert from "../../../common/ErrorAlert/ErrorAlert";
import VotingWidget from "../../../common/VotingWidget/VotingWidget";

import { getSessionsForWorkshop, voteForSession, VoteType } from "../../../../services/sessions";
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

    const vote = useCallback(
        async (
            sessionId: number,
            voteType: VoteType
        ) => {
            try {
                const updatedSession = await voteForSession(sessionId, voteType);
                setSessions(
                    sessions => sessions.map( s => s.id === sessionId ? updatedSession : s )
                );
                toast.success('You vote for session ' + updatedSession.name +' has been captured');
            } catch(error) {
                toast.error((error as Error).message);
            }
        },
        [ sessions, voteForSession ]
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
                                    <VotingWidget
                                        votes={s.upvoteCount}
                                        vote={(voteType) => vote(s.id, voteType)}
                                    />
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