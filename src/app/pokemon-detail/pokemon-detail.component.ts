import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokemonDetail } from '../pokemon-detail';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemonDetail: Observable<PokemonDetail>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokemonDetail = this.pokemonService.getPokemonDetail(+id);
  }

  onBack() {
    this.router.navigate(['..'], { relativeTo: this.route, queryParamsHandling: 'preserve' })
  }

}
