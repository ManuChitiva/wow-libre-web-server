export interface CountryModel {
  value: string;
  label: string;
  language: string;
}

export interface FaqsModel {
  question: string;
  answer: string;
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
  avatar_url: string;
}

export interface Characters {
  characters: Character[];
  total_quantity: number;
}

export interface Character {
  id: number;
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
  logo_expansion: string;
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

interface AccountBanned {
  id: number;
  bandate: string;
  unbandate: string;
  banned_by: string;
  ban_reason: string;
  active: boolean;
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
  account_banned: AccountBanned;
}

export interface AccountChangePasswordGameDto {
  salt: string;
  verifier: string;
  account_id: number;
  password: string;
}

interface Mails {
  id: number;
  message_type: number;
  sender_name: string;
  subject: string;
  body: string;
  has_items: boolean;
  expire_time: string;
  deliver_time: string;
  money: number;
}

export interface MailsDto {
  mails: Mails[];
  size: number;
}

export interface GuildDto {
  id: number;
  name: string;
  avatar: string;
  leader_name: string;
  emblem_style: number;
  emblem_color: number;
  border_style: number;
  border_color: number;
  info: string;
  motd: string;
  create_date: string;
  bank_money: number;
  members: number;
}

export interface GuildsDto {
  guilds: GuildDto[];
  size: number;
}

export interface GuildData {
  id: number;
  name: string;
  leader_name: string;
  emblem_style: number;
  emblem_color: number;
  border_style: number;
  border_color: number;
  info: string;
  motd: string;
  create_date: string;
  bank_money: number;
  formatted_bank_money: string;
  members: number;
  benefits: Benefit[];
}

interface Benefit {
  id: number;
  guild_id: number;
  logo: string;
  acquisition_date: string;
  expiration_date: string;
  title: string;
  sub_title: string;
  description: string;
}

export interface Profession {
  id: number;
  logo: string;
  name: string;
  value: number;
  max: number;
  service: Service;
}

interface Service {
  id: number;
  character_id: number;
  skill_id: number;
  name: string;
  description: string;
  score: number;
  is_public: boolean;
}
