import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from './pokemon';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PokemonDetail } from './pokemon-detail';

interface PokemonPage {
  page: number;
  pokemons: Pokemon[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pageSize = 20;
  pokemons: PokemonPage[] = [];

  constructor(private http: HttpClient) { }

  getPokemons(page: number): Observable<Pokemon[]> {
    const pokemonPage = this.pokemons.find(pokemonPage => pokemonPage.page == page);
    if (pokemonPage) {
      return of(pokemonPage.pokemons);
    }

    return this.fetchPokemon(page);
  }

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    let pokemon: Pokemon;
    const pokemonPage = this.pokemons.findIndex(pokemonPage => {
      pokemon = pokemonPage.pokemons.find(pokemon => pokemon.id == id);
      return pokemon != null;
    });
    if (pokemonPage) {
      if (pokemon?.detail != null) {
        return of(pokemon.detail);
      }
    }

    return this.fetchPokemonDetail(id);
  }

  private fetchPokemon(page: number): Observable<Pokemon[]> {
    const offset = page * this.pageSize;
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize}&offset=${offset}`).pipe(
      map(res => {
        const pokemons: Pokemon[] = [];
        res['results'].forEach(pokemon => {
          const urls = pokemon.url.split('/');
          const newPokemon: Pokemon = {
            id: urls[urls.length - 2],
            name: pokemon.name,
            url: pokemon.url
          };
          pokemons.push(newPokemon);
        });
        return pokemons;
      }),
      tap(res => {
        this.pokemons.push({
          page: page,
          pokemons: res
        });
      }),
      catchError(err => of(null))
    );
  }

  private fetchPokemonDetail(id: number): Observable<PokemonDetail> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map(res => {
        const types: string[] = [];
        res['types'].forEach(type => {
          types.push(type['type']['name']);
        });

        const pokemonDetail: PokemonDetail = {
          id: +res['id'],
          name: res['name'],
          spriteFront: res['sprites']['front_default'],
          spriteBack: res['sprites']['back_default'],
          types: types
        };

        return pokemonDetail;
      }),
      tap(res => {
        let pokemon: Pokemon;
        this.pokemons.findIndex(pokemonPage => {
          pokemon = pokemonPage.pokemons.find(pokemon => pokemon.id == id);
          return pokemon != null;
        });
        if (pokemon) {
          pokemon.detail = res;
        }
      }),
      catchError(err => of(null))
    );
  }
}
