import { RestService } from "../RestService";

import { ComputationResult, ComputationType, Measure } from "./interfaces";

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

  public async evaluateComputations(type: ComputationType, measureValues: {[key: string]: string}): Promise<ComputationResult[]> {
    const response = await this.client.post('evaluateComputations',
      {
        type: type,
        measureValues: measureValues
      }
    );
    return response.data;
  }
}