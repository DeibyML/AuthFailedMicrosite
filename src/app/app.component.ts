import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonsInfo } from './models/ButtonsInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  message = 'No fue posible realizar el proceso de autenticación';
  secondMessage = 'Por favor, verificar de nuevo';
  dataOk = false;
  dataParams = new ButtonsInfo();

  constructor(private route: ActivatedRoute) {
    // Recibe los parámetros por URL y los decodifica.
    this.route.queryParams.subscribe(prm => {
      if (prm?.data) {
        this.dataOk = this.decodeData(prm);
      }
    });
  }

  /**
   * Método que decodifica y parsea la data recibida y por parámetros en URL.
   * @param prm Parámetro a intentar decodifcar.
   */
  decodeData(prm): boolean {
    try {
      let params;
      params = atob(prm?.data);
      try {
        const dataParsed = JSON.parse(params);
        if (dataParsed && typeof dataParsed === 'object') {
          this.dataParams = dataParsed;
          return true;
        } else {
          return false;
        }
      } catch (errJson) {
        this.dataParams = null;
        this.secondMessage = 'Formato JSON de los datos no es válido.';
        console.error(this.secondMessage);
        return false;
      }
    } catch (errDecod) {
      this.dataParams = null;
      this.secondMessage = 'La codificación de los datos en la URL no es válida.';
      console.error(this.secondMessage);
      return false;
    }
  }

  // Método que redirigue la página a cada micrositio.
  redirectTopTo = (url) => window.top.location.replace(url);

  // Método que redirigue la página a cada micrositio.
  redirectTo = (url: string) => location.href = url;
}
