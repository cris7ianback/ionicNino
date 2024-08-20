import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(
    arreglo: any[],
    texto: string = '',
    columna: string = 'title'
  ): any[] {

    // Si el texto de búsqueda está vacío, devuelve el arreglo sin cambios.
    if (!texto) {
      return arreglo;
    }

    // Si el arreglo no está definido, devuelve un arreglo vacío.
    if (!arreglo) {
      return [];
    }

    // Convierte el texto de búsqueda a minúsculas.
    texto = texto.toLowerCase();

    // Filtra el arreglo basado en el texto de búsqueda y la columna especificada.
    return arreglo.filter(item => {
      // Verifica si la propiedad 'columna' existe y es una cadena.
      if (item[columna] && typeof item[columna] === 'string') {
        // Compara el texto de búsqueda con el valor de la columna.
        return item[columna].toLowerCase().includes(texto);
      }
      // Si la propiedad no es una cadena, no la incluye en el resultado.
      return false;
    });
  }

}
