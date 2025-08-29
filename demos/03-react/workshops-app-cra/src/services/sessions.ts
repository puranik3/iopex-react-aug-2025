import axios from "axios";
import ISession from "../models/ISession";

export type VoteType = 'upvote' | 'downvote';

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `https://workshops-server.onrender.com/workshops/${workshopId}/sessions`
    );

    return response.data;
};

const voteForSession = async (sessionId: number, voteType: VoteType) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.put<ISession>(
        `https://workshops-server.onrender.com/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession };