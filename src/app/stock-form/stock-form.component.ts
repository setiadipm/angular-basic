import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  @ViewChild('textInput') textInput: ElementRef;
  @Output() itemAdded = new EventEmitter<any>();
  name!: string;
  stock = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.name != '' && !isNaN(this.stock)) {
      const newItem = {
        name: this.name,
        stock: this.stock
      };
      this.itemAdded.emit(newItem);

      this.name = '';
      this.stock = 0;
      this.textInput.nativeElement.focus();
    }
  }

}
