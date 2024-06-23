import { RestService } from "../RestService";
import { InputDto } from "./interfaces";

export class InputService extends RestService<any> {
    public constructor(baseUrl: string) {
        super(baseUrl, 'input');
    }

    public async getInputs(): Promise<InputDto[]> {
        const response = await this.client.get('all');
        return response.data;
    }
}