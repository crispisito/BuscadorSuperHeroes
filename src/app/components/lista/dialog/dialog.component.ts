import { Component, OnInit, Inject } from '@angular/core';
import { SuperHeroe } from 'src/app/interfaces/super-heroe';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})

export class DialogComponent implements OnInit {

  alt: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuperHeroe,
  ) { }

  ngOnInit(): void { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /* eliminarHeroe(e: SuperHeroe): void {
    this.superHeroesService.deleteSuper(e.id);
    this.dialogRef.close();
  } */

}
