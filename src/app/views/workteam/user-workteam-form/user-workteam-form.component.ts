import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user/user.service';
import { WorkTeamService } from '../../../services/workteam/work-team.service';
import { Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { UserWorkteamService } from '../../../services/user-workteam/user-workteam.service';

@Component({
  selector: 'app-user-workteam-form',
  standalone: true,
  imports: [DropdownModule, CommonModule, FormsModule, SidebarComponent],
  templateUrl: './user-workteam-form.component.html',
  styleUrl: './user-workteam-form.component.css'
})
export class UserWorkteamFormComponent implements OnInit {
  usuarios: any[] = []; // Lista de usuarios
  workTeams: any[] = []; // Lista de equipos de trabajo
  selectedUsuario: string | null = null; // Usuario seleccionado
  selectedWorkTeam: string | null = null; // Equipo de trabajo seleccionado

  constructor(
    private userService: UserService,
    private workTeamService: WorkTeamService,
    private userWorkteamService: UserWorkteamService, // Añadido
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadWorkTeams();
  }

  // Cargar usuarios
  private loadUsers() {
    this.userService.listUsers().then((response: any) => {
      this.usuarios = response as any[];
    }).catch(error => {
      console.error('Error al cargar usuarios', error);
    });
  }

  // Cargar equipos de trabajo
  private loadWorkTeams() {
    this.workTeamService.list().then((response: any) => {
      this.workTeams = response as any[];
    }).catch(error => {
      console.error('Error al cargar equipos de trabajo', error);
    });
  }

  // Guardar la asignación de usuario a equipo de trabajo
  guardar() {
    if (this.selectedUsuario && this.selectedWorkTeam) {
      const data = {
        user: this.selectedUsuario,
        workTeam: this.selectedWorkTeam
      };

      // Llamar al servicio para guardar la asignación
      this.userWorkteamService.save(data).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Asignación guardada correctamente'
        }).then(() => {
          this.router.navigate(['/user-workteam-list']); // Redirige a la lista de asignaciones
        });
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al guardar la asignación'
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos'
      });
    }
  }

  // Cancelar la operación
  cancelar() {
    this.router.navigate(['/user-workteam-list']); // Redirige a la lista de asignaciones
  }

  // Opcional: Métodos para manejar cambios en los selects (si necesitas lógica adicional)
  onUsuarioChange(event: any) {
    console.log('Usuario seleccionado:', event);
  }

  onWorkTeamChange(event: any) {
    console.log('Equipo de trabajo seleccionado:', event);
  }
}
