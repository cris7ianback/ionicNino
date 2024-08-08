import { Component } from '@angular/core';

interface Componente {
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  componentes: Componente[] = [
    {
      icon: 'stats-chart-outline',
      name: 'Métricas',
      redirecTo: '/stats'
    },
    {
      icon: 'analytics-outline',
      name: 'Stats Mensuales',
      redirecTo: '/stats'
    },
    {
      icon: 'person-circle-outline',
      name: 'Usuarios',
      redirecTo: '/list-usuarios'
    },
    {
      icon: 'people-circle-outline',
      name: 'Clientes',
      redirecTo: '/list-clientes'
    },
    {
      icon: 'bag-handle-outline',
      name: 'Productos',
      redirecTo: '/productos'
    },
    {
      icon: 'cash-outline',
      name: 'Inversión',
      redirecTo: '/list-inversion'
    },
    {
      icon: 'wallet-outline',
      name: 'Ventas',
      redirecTo: '/stats'
    }, {
      icon: 'newspaper-outline',
      name: 'Auditoría',
      redirecTo: '/stats'
    },
  ];
  menuType: string = 'overlay';
  constructor() { }

}
