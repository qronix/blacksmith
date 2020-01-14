import axios from 'axios';

export const registerPasswordUser = async ({ email, password }) => {
    try{
        const response = await axios.post('/register',{ email, password });
        return response.data;
    }catch(err){
        return false;
    }
};

// export const loginPasswordUser = async ({email, password}) => {

// };

export const verifyToken = async TOKEN => {
    // console.log(TOKEN);
    try{
        const response = await axios.post('/verifytoken',{TOKEN});
        console.log('API response: ', response);
        const { data, status } = response;
        return { data, status };
    }catch(err){
        return false;
    }
};

export const sendUserToken = async token => {

};