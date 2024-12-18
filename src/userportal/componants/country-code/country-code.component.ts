import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, Subject, takeUntil, startWith, map } from 'rxjs';
import { GeneralService } from '../../services/general.service';
import { GeneralHelper } from '../../helper/generalhelper';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-country-code',
  standalone: true,
  imports: [MatSelectModule , ReactiveFormsModule , CommonModule , MatFormFieldModule ,MatInputModule],
  templateUrl: './country-code.component.html',
  styleUrl: './country-code.component.scss'
})
export class CountryCodeComponent implements OnInit , OnDestroy {
  @Output() countryChanged = new EventEmitter<any>();
  @Input() phoneControl!: any;
  @Input() codeControl!: any;
  @Input() codeControlValue!: any;
  @Input() disable = false
  @ViewChild('mySelect') mySelect!: MatSelect;

  private generalHelper: GeneralHelper = new GeneralHelper();
  countryCtrl = new FormControl();
  filteredCountries: Observable<any[]> = new Observable();
  dropFlag: boolean = false;
  currentCountry: any = [];
  currentFlag: any;
  currentCode: any;
  countryList: any = [];
  phone_number!: number;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private generalService: GeneralService) {}
  ngOnInit() {

    this.generalService.getCountriesDialCode().pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.countryList = res.countyDetails;
      if (this.codeControlValue) {
        this.currentCode=this.codeControl.value
       this.currentCountry=this.generalHelper.filterCountryDial(this.currentCode,this.countryList)

      } else {
        this.currentCode = localStorage.getItem('current_country')
        ? localStorage.getItem('current_country')
        : 'in';
        this.currentCountry = this.generalHelper.filterCode(
          this.currentCode,
          this.countryList
        );
         this.codeControl.setValue(this.currentCountry[0].dial_code);

      }


      this.filteredCountries = this.countryCtrl.valueChanges.pipe(
        startWith(''),
        map((country) =>
          country
            ? this.generalHelper.filterPhone(country, this.countryList)
            : this.countryList.slice()
        )
      );
    });
    if(this.disable){
      this.phoneControl.disable()
    }
  }
  blur() {
    this.dropFlag = true;
  }
  // @HostListener('document:mousedown', ['$event'])
  // onDocumentMouseDown(event: MouseEvent) {
  //   if (!this.dropdown.nativeElement.contains(event.target)) {
  //     // this.dropFlag=false
  //   }
  // }
  changeCountryCode(data: any) {
    this.dropFlag = false;
    this.codeControl.setValue(data.dial_code);
    this.currentCountry[0] = data;
  }
  passData() {
    let passdata = this.currentCountry[0]?.dial_code;
    this.countryChanged.emit(passdata);
  }
  openselect() {
    if(!this.disable)
      this.mySelect.open();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
