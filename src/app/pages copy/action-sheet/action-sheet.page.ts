import { InicioPage } from '../inicio/inicio.page'
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-sheet',
  templateUrl: './action-sheet.page.html',
  styleUrls: ['./action-sheet.page.scss'],
})
export class ActionSheetPage implements OnInit {

  component = InicioPage;

  constructor() { }

  ngOnInit() {
  }

}
