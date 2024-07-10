import { MeasureValue } from "../../stores/interfaces/MeasureValue";
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

  public async evaluateSports(measureValues: MeasureValue[], sportName?: string[]): Promise<ComputationResult[]> {
    const response = await this.client.post('evaluateComputations',
      {
        type: ComputationType.Sport,
        names: sportName,
        measureValues: this.getMeasureValuesDictionary(measureValues)
      });

    return response.data;
  }

  public async evaluateMetrics(measureValues: MeasureValue[], metricNames?: string[]): Promise<ComputationResult[]> {
    const response = await this.client.post('evaluateComputations',
      {
        type: ComputationType.Metric,
        names: metricNames,
        measureValues: this.getMeasureValuesDictionary(measureValues)
      });

    return response.data;
  }

  private getMeasureValuesDictionary(measureValues: MeasureValue[]): { [key: string]: string } {
    return measureValues.reduce((acc, m) => {
      acc[m.name] = m.value || "";
      return acc;
    }, {} as { [key: string]: string });
  }
}