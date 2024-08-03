import { ComputationType } from "./ComputationType";

export interface SportDto {
  name: string;
  type: ComputationType;
  variables: Record<string, number | string | boolean>;
  formula: string;
  disabled: boolean;
}