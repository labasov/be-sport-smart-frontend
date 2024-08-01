export interface SportDto {
  name: string;
  variables: Record<string, number | string | boolean>;
  formula: string;
  disabled: boolean;
}