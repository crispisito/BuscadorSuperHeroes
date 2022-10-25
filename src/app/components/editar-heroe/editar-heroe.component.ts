import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SuperHeroe } from 'src/app/interfaces/super-heroe';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';

@Component({
  selector: 'app-editar-heroe',
  templateUrl: './editar-heroe.component.html',
  styleUrls: ['./editar-heroe.component.scss']
})
export class EditarHeroeComponent implements OnInit {

  superHeroe: SuperHeroe;
  heroForm: FormGroup;
  validate: boolean;

  constructor(
    private superHeroesService: SuperHeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.superHeroe = {
      id: 0,
      name: ''
    };

    this.heroForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ])
    }, []);

    this.validate = false;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const id = Number(params['id']);
      this.superHeroe = this.superHeroesService.getById(id);
    })

    this.heroForm.patchValue({
      name: this.superHeroe.name
    })
  }

  getDataForm() {
    this.superHeroe.name = this.heroForm.value.name;

    if (this.heroForm.valid) {
      this._snackBar.open('Se han modificado correctamente', '', {
        duration: 4000
      });
      this.superHeroesService.editSuper(this.superHeroe);
      this.router.navigate(['/lista'])
    } else {
      this.validate = true;
    }
  }

}
