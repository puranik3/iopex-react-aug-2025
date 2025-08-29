import axios from "axios";
import ISession from "../models/ISession";

const getSessionsForWorkshop = async (workshopId: number) => {
    const response = await axios.get<ISession[]>(
        `https://workshops-server.onrender.com/workshops/${workshopId}/sessions`
    );

    return response.data;
};

export { getSessionsForWorkshop };