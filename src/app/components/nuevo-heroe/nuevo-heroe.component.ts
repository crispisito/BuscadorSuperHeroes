import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuperHeroe } from 'src/app/interfaces/super-heroe';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-nuevo-heroe',
  templateUrl: './nuevo-heroe.component.html',
  styleUrls: ['./nuevo-heroe.component.scss']
})
export class NuevoHeroeComponent implements OnInit {

  superHeroeList: SuperHeroe[];
  heroForm: FormGroup;
  validate: boolean;
  message: string = 'El campo no puede quedarse vacio';

  constructor(
    private superHeroesService: SuperHeroesService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.superHeroeList = new Array();

    this.heroForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
    }, []);

    this.validate = false;
  }

  ngOnInit(): void {
    this.superHeroeList = this.superHeroesService.getAll();
  }

  getDataForm() {
    let exist = this.superHeroeList.find(s => s.name.toLowerCase() === this.heroForm.value.name.toLowerCase());

    if (exist) {
      this.message = 'El Super Héroe ya existe';
    }
    else if (this.heroForm.valid) {
      this.superHeroesService.addHero(this.heroForm.value);
      this._snackBar.open('El nuevo Super Héroe se ha añadido correctamente', '', {
        duration: 4000
      });

      this.router.navigate(['/lista']);
    }
    else {
      this.validate = true;
    }
  }

}
