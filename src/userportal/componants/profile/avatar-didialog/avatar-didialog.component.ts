import { Component, inject } from '@angular/core';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-didialog',
  standalone: true,
  imports: [MatDialogClose],
  templateUrl: './avatar-didialog.component.html',
  styleUrl: './avatar-didialog.component.scss'
})
export class AvatarDidialogComponent {
  readonly dialogRef = inject(MatDialogRef)
  public numArray = [ '1' , '2' , '3','4','5' ,'6' , '7' ,'8' , '9' , '10']

  selectProfileImg(index : string){
    this.dialogRef.close(index)
  }
}
