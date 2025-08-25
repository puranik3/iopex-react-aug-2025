import axios from 'axios';

const getWorkshops = async ( page = 1 ) => {
    const response = await axios.get(
        `https://workshops-server.onrender.com/workshops`,
        {
            params: {
                _page: page
            }
        }
    );
    return response.data;
};

export {
    getWorkshops
};