import { Component, Input, OnInit } from '@angular/core';

import { Stock } from '../models/stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  @Input() stock: Stock;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.stockService.deleteStock(this.stock);
  }

}
