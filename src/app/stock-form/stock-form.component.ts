import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit, AfterViewInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  form: FormGroup;
  formSubmitted = false;

  constructor(private formBuilder: FormBuilder,
    private stockService: StockService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      qty: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngAfterViewInit(): void {
    this.nameInput.nativeElement.focus();
  }

  resetForm(): void {
    this.form.reset();
    this.form.patchValue({
      qty: 0
    })
  }

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.form.valid) {
      const name = this.form.value['name'];
      const qty = this.form.value['qty'];
      this.stockService.addStock(name, qty);

      this.resetForm();
      this.nameInput.nativeElement.focus();
    }
  }

}
