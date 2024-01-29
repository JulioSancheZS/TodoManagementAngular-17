import { Component, inject } from '@angular/core';
import { TokenService } from '../../../core/services/token.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  /**
   *
   */
  isAuthenticated$;

  private jwtDecodeService = inject(AuthService)
  decode: any

  
  constructor(private tokenService: TokenService, private routes: Router) {
    this.isAuthenticated$ = this.tokenService.isAuthenticacion
    
    const token = this.tokenService.getToken()

    // Verificar si el token es null y proporcionar un valor predeterminado (puede ser un objeto vacío)
      this.decode = token ? this.jwtDecodeService.decodeToken(token) : {};

      //console.log(this.decode)
      
  }

  onLogout(){
      this.tokenService.removeToken()
      this.routes.navigate(['/'])
  }
}
