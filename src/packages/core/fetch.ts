import axios from 'axios';

const createFetch = (baseURL: string) => axios.create({ baseURL });

export default createFetch;
