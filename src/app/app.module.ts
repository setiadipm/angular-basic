import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { StockItemComponent } from './stock-item/stock-item.component';
import { StockFormComponent } from './stock-form/stock-form.component';

@NgModule({
  declarations: [
    AppComponent,
    StockListComponent,
    StockItemComponent,
    StockFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
