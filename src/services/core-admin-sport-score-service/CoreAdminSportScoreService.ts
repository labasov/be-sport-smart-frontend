import { RestServiceBase } from "../RestService";

import { SportScoreDto } from "./interfaces/SportScoreDto";

export class CoreAdminSportScoreService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, 'core/admin/sportScore');
  }

  public async getSportScores(): Promise<SportScoreDto[]> {
    return await this.post('getSportScoreData');
  }

  public async updateSportScores(sportScores: SportScoreDto[]): Promise<void> {
    return await this.post('updateSportScoreData', [...sportScores]);
  }
}