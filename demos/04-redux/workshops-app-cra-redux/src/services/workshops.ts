import axios from 'axios';
import IWorkshop from '../models/IWorkshop';

type Params = {
    _page: number;
    category?: string
};

const apiUrl = process.env.REACT_APP_API_URL;

const getWorkshops = async ( page = 1, category: string = '' ) => {
    const params: Params = {
        _page: page,
    };

    if (category !== '') {
        params.category = category;
    }

    const response = await axios.get<IWorkshop[]>(
        `${apiUrl}/workshops`,
        {
            // params: params
            params
        }
    );
    return response.data;
};

const getWorkshopById = async ( id : number ) => {
    const response = await axios.get<IWorkshop>(
       `${apiUrl}/workshops/${id}`
    );
    return response.data;
};

const deleteWorkshopById = (workshopId: number) => {
    return axios.delete<void>(`${apiUrl}/workshops/${workshopId}`);
};

export {
    getWorkshops,
    getWorkshopById,
    deleteWorkshopById
};