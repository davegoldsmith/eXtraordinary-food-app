export interface UserPreference {
  user_id: number;
  pref_name: string;
  pref_value: string | Array<string>;
}