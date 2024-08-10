import { RestServiceBase } from "../RestService";

import { ComputationType } from "./interfaces/ComputationType";
import { SportDto } from "./interfaces/SportDto";

type SportDtoForUpdate = Omit<Omit<Omit<SportDto, 'disabled'>, "formula">, "type"> & { disabled?: boolean };

export class SportManagerService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, 'core/admin/sportManager');
  }

  public async getSports(computationType: ComputationType): Promise<SportDto[]> {
    return await this.post('getSports', {
      type: computationType
    });
  }

  public async updateSports(sports: SportDtoForUpdate[]): Promise<SportDto[]> {
    return await this.post('updateSports', { sports: [...sports] });
  }

  public async createSport(sport: SportDto, disabled: boolean): Promise<SportDto> {
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

  public async syncSports(names: string[]): Promise<SportDto[]> {
    return await this.post('syncSports', { 
      names
    });
  }

  public async deleteSport(sport: SportDto): Promise<void> {
    return await this.post('deleteSport', { name: sport.name });
  }
}