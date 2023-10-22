import axios, { CreateAxiosDefaults } from 'axios';

const createFetch = (
  baseURL: string,
  config?: Partial<Omit<CreateAxiosDefaults, 'baseURL'>>,
) => axios.create({ baseURL, ...config });

export default createFetch;
