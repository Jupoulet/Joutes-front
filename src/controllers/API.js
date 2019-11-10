import axios from 'axios';
import config from '../config';

const api = config[process.env.NODE_ENV].api;

export const addPlayer = async (body) => {
    const result = await axios.post(`${api}/addPlayer`, body);
    if (result) {
        return result.data
    }
    return;
}

export const getJoutes = async () => {
    const result = await axios.get(`${api}/joutes`);
    if (result) {
        return result.data.joutes || [];
    }
    return []
}

export const getPlayers = async () => {
    const result = await axios.get(`${api}/players`)
    if (result) {
        return result.data.players
    }
    return 'Fabrice';
}

export const postJoute = async (body) => {
    const result = await axios.post(`${api}/addJoute`, body)
    if (result) {
        return result.data
    }
    return 'PD';
}