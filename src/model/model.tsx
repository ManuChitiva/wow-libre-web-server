export interface CountryModel {
  value: string;
  label: string;
  language: string;
}

export interface ExistEmailModel {
  exist: boolean;
}

export interface AccountGameRequestDto {
  username: string;
  salt: string;
  verifier: string;
}

export interface AccountWebRequestDto {
  country: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  password: string;
}

export interface LoginData {
  jwt: string;
  refresh_token: string;
  expiration_date: string;
}

export interface Characters {
  characters: Character[];
  total_quantity: number;
}

export interface Character {
  id: 1;
  name: String;
  race: String;
  gender: String;
  class: String;
  level: number;
  xp: number;
  money: number;
  flags: String;
  note: String;
  race_id: number;
  class_id: number;
}

export interface AccountsModel {
  id: number;
  username: string;
  email: string;
  expansion: string;
  online: boolean;
  failed_logins: string;
  join_date: string;
  last_ip: string;
}

export interface AccountBannedModel {
  active: boolean;
  reason: string;
  ban_date: string;
  banned_by: string;
  unban_date: string;
}

export interface AccountMutedModel {
  mute_date: string;
  mute_time: string;
  muted_by: string;
  reason: string;
}

export interface Friends {
  friends: Character[];
  total_quantity: number;
}

interface AccountWeb {
  id: number;
  country: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
  cell_phone: string;
  email: string;
  rol_name: string;
  status: boolean;
  verified: boolean;
}

export interface AccountDetailDto {
  id: number;
  username: string;
  email: string;
  expansion: string;
  online: boolean;
  failed_logins: string;
  join_date: string;
  last_ip: string;
  mute_reason: string;
  mute_by: string;
  mute: boolean;
  last_login: string;
  os: string;
  account_web: AccountWeb;
}

export interface AccountChangePasswordGameDto {
  salt: string;
  verifier: string;
  account_id: number;
  password: string;
}
