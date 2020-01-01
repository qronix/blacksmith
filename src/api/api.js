import axios from 'axios';

export const registerPasswordUser = async ({ email, password }) => {
    try{
        const response = await axios.post('/register',{ email, password });
        return response.data;
    }catch(err){
        return new Promise((res,rej)=>{rej(false)});
    }
};

// export const loginPasswordUser = async ({email, password}) => {

// };

export const loginUser = async token => {
    
};

export const sendUserToken = async token => {

};