export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  api_hash: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
}

export type SignUpChangeHandler = <TKey extends keyof SignUpData>(
	value: SignUpData[TKey],
	name: TKey
) => void;