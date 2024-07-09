import { RestServiceBase } from "../RestService";

import { ComputationResult, ComputationType, Measure } from "./interfaces";

export class CoreService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, 'core');
  }

  public async getMeasures(): Promise<Measure[]> {
    const response = await this.client.post('getAvailableMeasures',
      {
        sources: ['User', 'Professional']
      });

    return response.data;
  }

  public async evaluateSports(measureValues: { [key: string]: string }, sportName? :string[]): Promise<ComputationResult[]> {
    const response = await this.client.post('evaluateComputations',
      {
        type: ComputationType.Sport,
        names: sportName,
        measureValues: measureValues
      });

    return response.data;
  }

  public async evaluateMetrics(measureValues: { [key: string]: string }, metricNames?: string[]): Promise<ComputationResult[]> {
    const response = await this.client.post('evaluateComputations',
      {
        type: ComputationType.Metric,
        names: metricNames,
        measureValues: measureValues
      });

    return response.data;
  }
}