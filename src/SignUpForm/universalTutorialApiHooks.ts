import {useEffect, useState} from 'react';
import {City, State} from './types';

let token: string | undefined;

const BASE_URL = 'https://www.universal-tutorial.com/api';

const initializeToken = async () => {
    const result = await fetch(`${BASE_URL}/getaccesstoken`, {
        headers: {
            'api-token': 'd2KSS7-zZ5-2vid0t1wwtxjTVY0bHTeXM43JolHdO6gmJlqMzfe_MdjbdNVYgg4uaMk',
            'user-email': 'michaelv@soluto.com',
        },
    });

    token = (await result.json()).auth_token;
};

const getToken = async () => {
    if (!token) {
        await initializeToken();
    }

    return token;
};

const fetchWithAuth = async (url: string) => {
    const token = await getToken();

    const result = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    return result.json();
};

type FetchResult<T> = {
    value?: T | undefined;
    error?: Error;
};

const useFetchedValues = <T>(url: string): FetchResult<T> => {
    const [value, setValue] = useState<T>();
    const [error, setError] = useState<any>();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const rawResult = await fetchWithAuth(url);
                setValue(rawResult);
            } catch (err: any) {
                setError(err);
            }
        };

        fetchCities();
    }, [url]);

    return {value, error};
};

export const useStates = () => useFetchedValues<State[]>(`${BASE_URL}/states/United States`);

export const useCities = (state?: string) => useFetchedValues<City[]>(`${BASE_URL}/cities/${state}`);
