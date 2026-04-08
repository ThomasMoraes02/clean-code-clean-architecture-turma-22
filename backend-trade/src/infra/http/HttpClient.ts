import axios from "axios";

/**
 * Interface para o cliente HTTP. Define o método post para realizar requisições HTTP POST para outros serviços.
 */
export default interface HttpClient {
    post(url: string, body: any): Promise<any>;
}

/**
 * Adapter para a biblioteca Axios. Permite realizar requisições HTTP POST para outros serviços.
 */
export class AxiosAdapter implements HttpClient {
    async post(url: string, body: any): Promise<any> {
        const response = await axios.post(url, body);
        return response.data;
    }
}