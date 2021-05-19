import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  items = [
    {
      id: 1,
      name: 'Nasi Goreng',
      stock: 5,
    },
    {
      id: 2,
      name: 'Fish n Chip',
      stock: 2
    },
    {
      id: 3,
      name: 'Caesar Salad',
      stock: 10,
    },
    {
      id: 4,
      name: 'Spaghetti Bolognese',
      stock: 3,
    },
    {
      id: 5,
      name: 'Spaghetti Carbonara',
      stock: 1,
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem(newItem: any) {
    newItem.id = this.items.length + 1;
    this.items.push(newItem);
  }

  onDeleteItem(newItem: any) {
    const deletedIndex = this.items.findIndex(item => item.id == newItem.id);
    this.items.splice(deletedIndex, 1);
  }

}
