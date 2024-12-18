import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip'
import { GeneralService } from '../../../services/general.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GeneralHelper } from '../../../helper/generalhelper';
import { CountryCodeComponent } from '../../country-code/country-code.component';
import { ResetPassword } from '../../../models/models';
import {MatDialog, MatDialogModule} from'@angular/material/dialog'
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatTooltipModule, CountryCodeComponent , MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy, OnInit {
  signInForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  signUpForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', Validators.required),
    phone_country_code: new FormControl('', Validators.required)
  })
  forgotPassForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })
  resetPasswordForm: FormGroup = new FormGroup({
    // email:new FormControl('',[Validators.required]),
    otp: new FormControl('', [Validators.required]),
    new_password: new FormControl('', [Validators.required])
  });
  private destroy$: Subject<void> = new Subject()
  currentUrl: string = ''
  btnloader: boolean = false
  private generalHelper: GeneralHelper = new GeneralHelper()
  showResetForm: boolean = false;
  passwordVisible : boolean = false
  constructor(private router: Router, private generalService: GeneralService , private matDialog : MatDialog) {

  }
  ngOnInit(): void {
    const currenturl = sessionStorage.getItem('landingUrl')
    this.currentUrl = currenturl ? currenturl : ''
  }

  login(){
    this.router.navigate(['/profile/create-profile'])
  }

  signIn() {
    if (this.signInForm.valid) {
      this.btnloader = true
      this.generalService.signIn(this.signInForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.btnloader = false
          this.generalHelper.manageLogin(res)
          this.generalService.getProfiles().pipe(takeUntil(this.destroy$)).subscribe({
            next : (res : any)=>{
              if(res && res.message == 'Success'){
                if(res.profiles && res.profiles.length > 0){
                  //  routr to profiles
                }
                else{
                  // cretae profiles
                }
              }
            },
            error : (err : HttpErrorResponse)=>{}
          })
        },
        error: (err: HttpErrorResponse) => {
          this.btnloader = false
        }
      })
    } else {
      this.signInForm.markAllAsTouched()
    }
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.btnloader = true
      this.generalService.signUp(this.signUpForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.btnloader = false
        },
        error: (err: HttpErrorResponse) => {
          this.btnloader = false
        }
      })
    }
    else {
      this.signUpForm.markAllAsTouched()
    }
  };

  forgotPassword() {
    if (this.forgotPassForm.valid) {
      this.btnloader = true
      this.generalService.forgotPassword(this.forgotPassForm.value).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.showResetForm = true;
          this.forgotPassForm.controls['email'].disable();
          this.btnloader = false
        },
        error: (err: HttpErrorResponse) => {
          this.btnloader = false
          if(err && err.error && err.error.message){
            this.matDialog.open(ErrorDialogComponent , {data : err.error.message , width : '40%' , minHeight: '200px'}).afterClosed().subscribe((res: any)=>{
            })
          }
        }
      })
    } else {
      this.forgotPassForm.markAllAsTouched();
    }
  };

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      this.btnloader = true
      let data: ResetPassword = {
        email: this.forgotPassForm.controls['email'].getRawValue(),
        otp: this.resetPasswordForm.controls['otp'].value,
        new_password: this.resetPasswordForm.controls['new_password'].value
      };
      this.generalService.resetFormPassword(data).pipe(takeUntil(this.destroy$)).subscribe({
        next: (res: any) => {
          this.resetPasswordForm.reset();this.forgotPassForm.reset();
          this.btnloader = false
        },
        error: (err: HttpErrorResponse) => {
          this.btnloader = false
          if(err && err.error && err.error.message){
            this.matDialog.open(ErrorDialogComponent , {data : err.error.message , width : '40%' , minHeight: '200px'}).afterClosed().subscribe((res: any)=>{
            })
          }
        }
      });
    }
    else{
      this.resetPasswordForm.markAllAsTouched()
    }
  };

  navigate(url: string) {
    this.router.navigate([`${url}`])
    this.currentUrl = url
  }
  changePasswordVisibility(){
    this.passwordVisible = !this.passwordVisible
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
