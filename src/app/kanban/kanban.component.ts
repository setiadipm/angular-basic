import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  todo = [
    '[#1864 - Widya] Nomor Voucher tidak sama dengan di payment method',
    '[#2290 - Rangga] KACS Auto GTR base on DN File dari KACS',
    '[#2213 - Jefry] Simple Purchase tambah informasi Purchase Payment',
    '[#2216 - Citra] Tambah Product Code pada ESB Core'
  ];
  progress = [];
  done = [];
  released = [];

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
