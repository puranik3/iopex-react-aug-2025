import axios from 'axios';
import IWorkshop from '../models/IWorkshop';

type Params = {
    _page: number;
    category?: string
};

const getWorkshops = async ( page = 1, category: string = '' ) => {
    const params: Params = {
        _page: page,
    };

    if (category !== '') {
        params.category = category;
    }

    const response = await axios.get<IWorkshop[]>(
        `https://workshops-server.onrender.com/workshops`,
        {
            // params: params
            params
        }
    );
    return response.data;
};

const getWorkshopById = async ( id : number ) => {
    const response = await axios.get<IWorkshop>(
       `https://workshops-server.onrender.com/workshops/${id}`
    );
    return response.data;
};

export {
    getWorkshops,
    getWorkshopById
};