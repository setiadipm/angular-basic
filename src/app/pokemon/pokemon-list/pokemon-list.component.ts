import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Pokemon } from '../models/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: Observable<Pokemon[]>;
  page = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.route.queryParamMap.pipe(
      tap((paramMap: ParamMap) => {
        if (paramMap.get('page')) {
          this.page = +paramMap.get('page');
        } else {
          this.page = 0;
        }
        this.pokemons = this.pokemonService.getPokemons(this.page);
      })
    ).subscribe();
  }

  onPrev(): void {
    if (this.page > 0) {
      const page = this.page - 1;
      if (page > 0) {
        this.router.navigate(['pokemon'], { queryParams: { page: page } });
      } else {
        this.router.navigate(['pokemon']);
      }
    }
  }

  onNext(): void {
    const page = this.page + 1;
    this.router.navigate(['pokemon'], { queryParams: { page: page } });
  }

}
