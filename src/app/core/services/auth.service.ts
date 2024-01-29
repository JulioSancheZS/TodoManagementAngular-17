import { Injectable } from '@angular/core';
import { ILogin, ILoginResponse } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { apiEndPoint } from '../constants/constans';
import { map } from 'rxjs';
import { TokenService } from './token.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService, private toastr: ToastrService) { }


  onLogin(data: ILogin){
    return this.http.post<ILoginResponse>(`${apiEndPoint.AuthEndPoint.login}`, data).pipe(
      map((response) => {
        if (response && response.token) {
          this.tokenService.setToken(response.token);
          return response;
        } else {
          this.toastr.warning(response.msg, "Alerta")
          console.log(response.msg);
          // Puedes lanzar un error, redirigir a la página de inicio de sesión, o tomar otra acción según tus necesidades.
          throw new Error('No se pudo obtener un token válido.');
        }
      })
    )
  }

  public decodeToken(token: string){
 
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    }
}
