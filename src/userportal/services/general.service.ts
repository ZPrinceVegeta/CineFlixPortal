import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForgotPassword, ResetPassword, SignUpReq, SigninRequest } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  baseURl = environment.baseUrl
  getAuthToken() {
    return 'token'
  }

  constructor(private http : HttpClient) { }
  signIn(data : SigninRequest){
    return this.http.post(`${this.baseURl}auth/signin/`, data)
  }
  getCountriesDialCode(){
    return this.http.get("assets/json/countryflagdialcode.json")
  }
  signUp(data : SignUpReq){
    return this.http.post(`${this.baseURl}auth/signup`, data)
  }
  forgotPassword(data:ForgotPassword){
    return this.http.post(`${this.baseURl}auth/forget-password/` , data)
  }
  resetFormPassword(data:ResetPassword){
return this.http.post(`${this.baseURl}auth/reset-password/`,data)
  }

  getProfiles(){
    return this.http.get(`${this.baseURl}profile/profiles`)
  }
  getLanguages(){
    return this.http.get(`${this.baseURl}crud/languages`)
  }
  getGenres(){
    return this.http.get(`${this.baseURl}crud/genres`)
  }
  createProfile(payload : any){
    return this.http.post(`${this.baseURl}profile/create-profile` , payload)
  }
}
