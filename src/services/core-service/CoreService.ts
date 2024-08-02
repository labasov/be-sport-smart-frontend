import { MeasureValue } from "../../stores/interfaces/MeasureValue";
import { RestServiceBase } from "../RestService";

import { ComputationResult, ComputationType, Measure } from "./interfaces";

export class CoreService extends RestServiceBase {
  public constructor(baseUrl: string) {
    super(baseUrl, '/core');
  }

  public async getMeasures(): Promise<Measure[]> {
    return await this.post('getAvailableMeasures');
  }

  public async evaluateSports(measureValues: MeasureValue[], sportName?: string[]): Promise<ComputationResult[]> {
    return await this.post('evaluateComputations',
      {
        type: ComputationType.Sport,
        names: sportName,
        measureValues: this.getMeasureValuesDictionary(measureValues)
      });
  }

  public async evaluateMetrics(measureValues: MeasureValue[], metricNames?: string[]): Promise<ComputationResult[]> {
    return await this.post('evaluateComputations',
      {
        type: ComputationType.Metric,
        names: metricNames,
        measureValues: this.getMeasureValuesDictionary(measureValues)
      });
  }

  private getMeasureValuesDictionary(measureValues: MeasureValue[]): { [key: string]: string } {
    return measureValues.reduce((acc, m) => {
      acc[m.name] = m.value || "";
      return acc;
    }, {} as { [key: string]: string });
  }
}