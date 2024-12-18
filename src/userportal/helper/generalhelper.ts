import { SignInRes } from "../models/models";
import { AES } from "crypto-js"
import { environment } from "../../environments/environment";
import * as CryptoJS from 'crypto-js';
import { FormGroup } from "@angular/forms";
export class GeneralHelper {
    private encryptkey = environment.tokenEncoderKey;


    manageLogin(data: SignInRes) {
        if (data.token) {
            let encryptedToken = AES.encrypt(data.token, this.encryptkey).toString()
            localStorage.setItem('Token', encryptedToken)
        }
    };

    getAuthToken() {
        try {
            const decryToken = localStorage.getItem('Token');
            if (decryToken) {
                return AES.decrypt(decryToken, this.encryptkey).toString(CryptoJS.enc.Utf8);
            } else {
                return null;
            };
        } catch (error) {
            return ""
        }
    };
    filterCode(name: any, list: any) {
        let arr = list.filter(
            (item: any) =>
                item.code.toLowerCase().indexOf(name.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
    }
    filterCountryDial(code: any, list: any) {
        let arr = list.filter(
            (item: any) =>
                item.dial_code.indexOf(code.toLowerCase()) === 0
        );

        return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
    }
    filterPhone(name:any,list:any){
        // const filterValue = name.toLowerCase();
        // return list.filter((country:any) => country.name.toLowerCase().includes(filterValue) || country.code.toLowerCase().includes(filterValue));
        let arr = list.filter(
          (item: any) =>
            item.code.toLowerCase().indexOf(name.toLowerCase()) === 0 || item.name.toLowerCase().indexOf(name.toLowerCase())===0
        );
    
        return arr.length ? arr : [{ name: 'No Item found', code: 'null' }];
      }
}