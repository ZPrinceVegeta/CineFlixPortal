import { Router } from '@angular/router';
import { GeneralService } from './../../../services/general.service';
import { Genres } from './../../../models/models';
import { AvatarDidialogComponent } from './../avatar-didialog/avatar-didialog.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { Language } from '../../../models/models';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [MatDialogModule , FormsModule , ReactiveFormsModule],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss'
})
export class CreateProfileComponent implements OnInit {
  currentPage = 'first'
  @ViewChild('nameInput') inputElement!: ElementRef;
  languaggeVm !: Language[]
  profileForm = new FormGroup({
    name : new FormControl('' , Validators.required),
    agegroup: new FormControl( false , Validators.required),
    language_preference : new FormControl<string[]>([] , Validators.required),
    genre_preference : new FormControl<string[]>([] , Validators.required),
    image_index : new FormControl('1' , Validators.required )
  })
  genresList !: Genres[]
  nameRequiredFlag = false
  checkIcon: string = 'assets/images/icon2/check.svg';
  constructor(private dialog : MatDialog , private router : Router , private generalService : GeneralService){

  }
  ngOnInit(): void {
    // const img = new Image();

    // img.src = this.checkIcon;
    console.log("oninit implemented");
    this.generalService.getLanguages().subscribe({
      next : (res : any) =>{
        console.log(res);
        if(res && res.languages && res.languages.length > 0){
        this.languaggeVm = this.createLanguageVm(res.languages)
        console.log(this.languaggeVm);

        }
      }
    })
    this.generalService.getGenres().subscribe({
      next : (res : any) =>{
        console.log(res , ' genre');
        if(res && res.genres && res.genres.length > 0)
        this.genresList = this.createGenreVm(res.genres)

      }
    })

  }
  createLanguageVm(languages : Language[]) : Language[]{
    const colors = ['#FF5733', '#33FF57', 'rgb(138 159 255)', '#FF33A6', '#FFDB33', '#33FFF1'];
    return languages.map((language , index) => ({
      ...language,
      color: colors[index % colors.length]
    }));
  }
  createGenreVm(genre : Genres[]) : Genres[]{
    const colors = ['#FF5733', '#33FF57', 'rgb(138 159 255)', '#FF33A6', '#FFDB33', '#33FFF1'];
    return genre.map((genre , index) => ({
      ...genre,
      color: colors[index % colors.length]
    }));
  }

  openAvatarDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.maxWidth = '100vw';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.panelClass = 'full-screen-dialog';




    this.dialog.open(AvatarDidialogComponent , dialogConfig).afterClosed().subscribe((res : string) => {
      console.log(res);
      if(res && typeof(res) == 'string')

        this.profileForm.get('image_index')?.setValue(res)

    })
  }
  swapChild(){
    console.log("click");
    console.log( this.profileForm);

    this.profileForm.get('agegroup')?.setValue(!this.profileForm.get('agegroup')?.value
    )
    console.log( this.profileForm);

  }
  nameBlur(){
    if(this.profileForm.get('name')?.invalid){
      this.nameRequiredFlag = true
    }

  }

  namePress(event : KeyboardEvent){
    console.log(event);
    if(event.isTrusted && event.code == 'Enter'){
      this.inputElement.nativeElement.blur();
    }
  }
  selectLanguage(id: string) {
    let languages = this.profileForm.get('language_preference')?.value;

    if (!languages) {
      languages = [];
    }

    const index = languages.indexOf(id);

    if (index === -1) {
      languages.push(id);
    } else {
      languages.splice(index, 1);
    }
    this.profileForm.get('language_preference')?.setValue(languages);
  }
  selectGenre(id: string) {
    let genres = this.profileForm.get('genre_preference')?.value;

    if (!genres) {
      genres = [];
    }

    const index = genres.indexOf(id);

    if (index === -1) {
      genres.push(id);
    } else {
      genres.splice(index, 1);
    }
    this.profileForm.get('genre_preference')?.setValue(genres);
  }
  isSelected(id: string): boolean {
    const languages = this.profileForm.get('language_preference')?.value;
    return languages ? languages.includes(id) : false;
  }
  isGenreSelected(id : string) : boolean{
    const genre = this.profileForm.get('genre_preference')?.value;
    return genre ? genre.includes(id) : false;
  }

  continue(page : string){
    this.currentPage = page
  }
  back(page : string){
    this.currentPage = page

  }
  submit(){
    console.log("iam here");

    this.generalService.createProfile(this.profileForm.value).subscribe({
      next : (res : any) =>{
        if(res.message && res.message == 'Profile created successfully'){
          this.router.navigate(['/profile'])
        }

      }
    })
  }



}
