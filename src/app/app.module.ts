import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { environment } from 'src/environments/environment.prod';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { ThrottleClickDirective } from './directives/throttle-click.directive';
import { KanbanComponent } from './kanban/kanban.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { StockListComponent } from './stock-list/stock-list.component';

const routes: Routes = [
  { path: '', component: StockListComponent },
  { path: 'pokemon', loadChildren: () => import('./pokemon/pokemon.module').then(m => m.PokemonModule) },
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ThrottleClickDirective,
    KanbanComponent,
    LoginComponent,
    RegisterComponent,
    StockFormComponent,
    StockItemComponent,
    StockListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
