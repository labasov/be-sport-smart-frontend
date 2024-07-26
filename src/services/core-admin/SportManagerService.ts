import { RestServiceBase } from "../RestService";

import { SportDto } from "./interfaces/SportDto";

export class SportManagerService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, 'core/admin/sportManager');
  }

  public async getSports(): Promise<SportDto[]> {
    return await this.post('getSports');
  }

  public async updateSports(sports: SportDto[]): Promise<void> {
    return await this.post('updateSports', { sports: [...sports] });
  }
}