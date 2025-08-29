import axios from "axios";
import ISession from "../models/ISession";

export type VoteType = 'upvote' | 'downvote';

const apiUrl = process.env.REACT_APP_API_URL;

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `${apiUrl}/workshops/${workshopId}/sessions`
    );

    return response.data;
};

const voteForSession = async (sessionId: number, voteType: VoteType) => {
    // we generally pass data in PUT request. In this case we don't have any data.
    const response = await axios.put<ISession>(
        `${apiUrl}/sessions/${sessionId}/${voteType}`
    );

    return response.data;
};

export { getSessionsForWorkshop, voteForSession };