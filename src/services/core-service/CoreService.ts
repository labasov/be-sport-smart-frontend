import { RestService } from "../RestService";

import { ComputationResult as Sport, ComputationType, Measure } from "./interfaces";

export class CoreService extends RestService<any> {
  public constructor(baseUrl: string) {
    super(baseUrl, 'core');
  }

  public async getMeasures(): Promise<Measure[]> {
    const response = await this.client.post('getAvailableMeasures',
      {
        sources: ['User', 'Professional']
      }
    );
    return response.data;
  }

  public async evaluateSports(measureValues: {[key: string]: string}): Promise<Sport[]> {
    const response = await this.client.post('evaluateComputations',
      {
        type: ComputationType.Sport,
        measureValues: measureValues
      }
    );
    return response.data;
  }
}