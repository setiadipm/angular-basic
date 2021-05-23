import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';
import { PokemonListComponent } from './pokemon-list.component';

const routes: Routes = [
  { path: '', component: PokemonListComponent },
  { path: ':id', component: PokemonDetailComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    PokemonDetailComponent,
    PokemonItemComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PokemonModule { }
