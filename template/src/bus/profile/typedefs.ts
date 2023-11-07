//state type____________________________________
export type ProfileState = {
  isFetching: boolean;
  profile: IProfile | null;
};

//payload types_________________________________
export type FillProfileActionPayload = IProfile;
// INJECT

//common types__________________________________

export interface IProfile {
  id: number;
  last_login: string;
  email: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_admin: boolean;
  email_confirmed_at: string;
  created_at: string;
  updated_at: string;
}
