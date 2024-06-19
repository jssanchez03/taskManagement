import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor() {}

  onSubmit(): void {
    if (this.username && this.password) {
      console.log(`Usuario: ${this.username}, Contraseña: ${this.password}`);
      // Lógica de autenticación
    } else {
      console.error('Formulario no válido');
    }
  }
}
