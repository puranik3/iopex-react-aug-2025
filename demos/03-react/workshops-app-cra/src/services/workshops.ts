import axios from 'axios';

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

    const response = await axios.get(
        `https://workshops-server.onrender.com/workshops`,
        {
            // params: params
            params
        }
    );
    return response.data;
};

export {
    getWorkshops
};