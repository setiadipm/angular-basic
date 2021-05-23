import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { StockListComponent } from './stock-list/stock-list.component';

const routes: Routes = [
  { path: '', component: StockListComponent },
  { path: 'pokemon', loadChildren: () => import('./pokemon-list/pokemon.module').then(m => m.PokemonModule) },
  { path: '**', redirectTo: '/' },
];
@NgModule({
  declarations: [
    AppComponent,
    StockFormComponent,
    StockItemComponent,
    StockListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
