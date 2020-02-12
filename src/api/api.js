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
        const response = await axios.post('/verifytoken',{ TOKEN });
        console.log('API response: ', response);
        const { data, status } = response;
        return { data, status };
    }catch(err){
        return false;
    }
};

export const login = async TOKEN => {
    try{
        const response = await axios.post('/login', { TOKEN });
        console.log('TOKEN: ', TOKEN);
        console.log('API (LOGIN) response: ', response);
        const { data, status } = response;
        //destructure sessionID and token
        //store in local storage
        console.log('Response data: ' , data);
        const { sessionID, token } = data.content;
        localStorage.setItem('blacksmith-sessionID', sessionID );
        localStorage.setItem('blacksmith-token', token);
        return { data, status };
    }catch(err){
        return false;
    }
} 

export const logout = async () => {
    try{
        const sessionID = window.localStorage.getItem('blacksmith-sessionID');
        const response = await axios.post('/logout', { sessionID });
        console.log('API (LOGOUT) response: ', response);
        return response;
    }catch(err){
        console.log('Logout error: ', err.message);
        return false;
    }
}

export const sendUserToken = async token => {

};