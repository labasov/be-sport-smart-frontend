import { RestServiceBase } from "../RestService";

import { SportDto } from "./interfaces/SportDto";

type SportDtoWithOptionalDisabled = Omit<SportDto, 'disabled'> & { disabled?: boolean };

export class SportManagerService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, 'core/admin/sportManager');
  }

  public async getSports(): Promise<SportDto[]> {
    return await this.post('getSports');
  }

  public async updateSports(sports: SportDtoWithOptionalDisabled[]): Promise<void> {
    return await this.post('updateSports', { sports: [...sports] });
  }

  public async createSport(sport: SportDto, disabled: boolean): Promise<void> {
    return await this.post('createSport', { 
      name: sport.name,
      variables: sport.variables,
      engine: "Js",
      disabled
    });
  }

  public async getSportTemplate(): Promise<SportDto> {
    return await this.post('getSportTemplate');
  }

  public async syncSport(sport: SportDto): Promise<SportDto> {
    return await this.post('syncSport', { 
      name: sport.name,
      variables: sport.variables
    });
  }

  public async deleteSport(sport: SportDto): Promise<void> {
    return await this.post('deleteSport', { name: sport.name });
  }
}