export interface SigninRequest {
    email: string,
    password: string
}

export interface SignInRes {
    token: string,
    message: string,
    user_id: string
}
export interface SignUpReq {
    email: string
    phone_number: string
    phone_country_code: string
    password: string
  }

  export interface ForgotPassword{
    email:string
  }
  export interface ResetPassword{
    email:string
    otp:string
    new_password:string
  }

export interface Language {
  id: string;
  name: string;
  native_name?: string;
  color ? : string
}
export interface Genres {
  id : string ,
  name : string,
  color : string
}
