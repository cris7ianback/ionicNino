import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() titulo: string = '';
  @Input() funcion: string = '';

  @Output() clickEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit() { }


  handleButtonClick() {
    this.clickEvent.emit();
  }
}
