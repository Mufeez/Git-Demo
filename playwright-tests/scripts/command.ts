import axios, {AxiosResponse} from 'axios';


export const demoApiCall = async (url: string) => {

    const response: AxiosResponse = await axios.get(url);
    return response;
  };