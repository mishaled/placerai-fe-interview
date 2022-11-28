import {UserData} from './types';

export default async (userData: UserData) => {
    await fetch('https://mock-signup.herokuapp.com/register', {
        method: 'post',
        body: JSON.stringify(userData),
    });
};
