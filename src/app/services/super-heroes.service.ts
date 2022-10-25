import { Injectable } from '@angular/core';
import { SuperHeroe } from '../interfaces/super-heroe'

@Injectable({
  providedIn: 'root'
})
export class SuperHeroesService {

  superHeroesList: SuperHeroe[];
  superHeroe: SuperHeroe;
  superHeroesSearch: SuperHeroe[];

  constructor() {
    this.superHeroesList = new Array(
      {
        id: 1,
        name: 'SuperMan'
      },
      {
        id: 2,
        name: 'Batman'
      },
      {
        id: 3,
        name: 'Thor'
      },
      {
        id: 4,
        name: 'Hulk'
      },
      {
        id: 5,
        name: 'Mujer Maravilla'
      },
      {
        id: 6,
        name: 'Mario Bros'
      },
      {
        id: 7,
        name: 'DeadPool'
      },
      {
        id: 8,
        name: 'Johnny Lawrence'
      },
      {
        id: 9,
        name: 'Iceman'
      },
      {
        id: 10,
        name: 'Cíclope'
      },
      {
        id: 11,
        name: 'Iron Man'
      },
      {
        id: 12,
        name: 'Cat Woman'
      },
      {
        id: 13,
        name: 'Lobo'
      },
      {
        id: 14,
        name: 'La Cosa'
      },
      {
        id: 15,
        name: 'Hellboy'
      },
      {
        id: 16,
        name: 'Flash'
      },
      {
        id: 17,
        name: 'Daredevil'
      }
    );

    this.superHeroe = {
      id: 0,
      name: ''
    };

    this.superHeroesSearch = new Array();
  }

  getAll(): SuperHeroe[] {
    return this.superHeroesList;
  }

  getById(id: number): SuperHeroe {
    this.superHeroesList.forEach(s => {
      if (s.id === id) {
        this.superHeroe = s;
      }
    })

    return this.superHeroe;
  }

  editSuper(superHeroe: SuperHeroe): SuperHeroe {
    this.superHeroesList.map(s => {
      if (s.id === superHeroe.id) {
        s.name = superHeroe.name;
      }
    })

    return this.superHeroe;
  }

  deleteSuper(id: number): SuperHeroe[] {
    this.superHeroesList.forEach((s, i) => {
      if (s.id === id) {
        this.superHeroesList.splice(i, 1);
      }
    })
    return this.superHeroesList;
  }

  getByParam(param: string): SuperHeroe[] {
    return this.superHeroesList.filter(s => s.name.toLocaleLowerCase().includes(param.toLocaleLowerCase()));
  }

  addHero(superHeroe: any): number {
    return this.superHeroesList.push({ id: 16, name: superHeroe.name });
  }
}
