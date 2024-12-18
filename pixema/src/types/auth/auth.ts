export interface IAuthSignUp {
  id: number;
  userename: string;
  email: string;
  course_group: number;
}

export interface IAuthSignIn {
  email: string;
  password: string;
}

export interface IAuthUser {
  username: string;
  id: number;
  email: string;
}

export interface IAuthJwt {
  access: string;
  refresh: string;
}

export interface IAuthRefresh {
  access: string;
}

//ниже будут интерфейсы ответов
