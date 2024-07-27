export interface SportDto {
  name: string;
  variables: Record<string, number>;
  formula: string;
  disabled: boolean;
}