import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  stocks: Stock[] = [
    {
      id: 1,
      name: 'Nasi Goreng',
      qty: 5,
    },
    {
      id: 2,
      name: 'Fish n Chip',
      qty: 2
    },
    {
      id: 3,
      name: 'Caesar Salad',
      qty: 10,
    },
    {
      id: 4,
      name: 'Spaghetti Bolognese',
      qty: 3,
    },
    {
      id: 5,
      name: 'Spaghetti Carbonara',
      qty: 1,
    }
  ];

  constructor() { }

  getStocks(): Observable<Stock[]> {
    return of(this.stocks);
  }

  addStock(name: string, qty: number) {
    const newStock: Stock = {
      id: this.stocks.length + 1,
      name: name,
      qty: qty
    };
    this.stocks.push(newStock);
  }

  deleteStock(stock: Stock) {
    const stockIndex = this.stocks.findIndex(s => s.id == stock.id);
    this.stocks.splice(stockIndex, 1);
  }
}
