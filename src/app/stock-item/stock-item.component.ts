import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  @Input() item;
  @Output() itemDeleted = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDelete() {
    this.itemDeleted.emit(this.item);
  }

}
