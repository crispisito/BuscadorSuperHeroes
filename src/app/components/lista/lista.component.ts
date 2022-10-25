import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { SuperHeroe } from 'src/app/interfaces/super-heroe';
import { SuperHeroesService } from 'src/app/services/super-heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  superHeroesList: SuperHeroe[];
  superHeroe: SuperHeroe;
  nombreHeroe: string;
  pageSize = 8;
  desde: number = 0;
  hasta: number = 8;
  charger = false;
  cont: number = 0;

  constructor(
    private superHeroesService: SuperHeroesService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private paginator: MatPaginatorIntl
  ) {
    this.superHeroesList = [];
    this.superHeroe = {
      id: 0,
      name: ''
    }
    this.nombreHeroe = '';
    this.paginator.itemsPerPageLabel = "Héroes por página";
    this.paginator.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${this.superHeroesList.length}`;
    };
  }

  ngOnInit() {
    if (this.superHeroesList.length === 0) {
      this.charger = true;
    }
    setTimeout(() => {
      this.charger = false;
      this.superHeroesList = this.superHeroesService.getAll();
    }, 1500)
  }

  buscarHeroe() {
    this.superHeroesList = this.superHeroesService.getByParam(this.nombreHeroe);
  }

  openDialog(e: SuperHeroe): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: e
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let nombre = this.superHeroesService.getById(result).name;
        this._snackBar.open(`${nombre} se ha eliminado`, '', {
          duration: 4000
        })
        this.superHeroesList = this.superHeroesService.deleteSuper(result);
      } else {
        console.log('No se ha eliminado el Super Héroe');
      }
    });
  }

  cambiarPagina(e: PageEvent) {
    this.charger = true;
    this.desde = 0;
    this.hasta = 0;
    setTimeout(() => {
      this.charger = false;
      this.desde = e.pageIndex * e.pageSize;
      this.hasta = this.desde + e.pageSize;
    }, 1000);

  }
}