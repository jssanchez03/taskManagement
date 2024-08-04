import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import Swal from 'sweetalert2';
import { WorkTeamService } from '../../../services/workteam/work-team.service';

@Component({
  selector: 'app-workteam-form',
  standalone: true,
  imports: [SidebarComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './workteam-form.component.html',
  styleUrl: './workteam-form.component.css'
})
export class WorkteamFormComponent implements OnInit {
  workTeamForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private workTeamService: WorkTeamService
  ) { }

  ngOnInit(): void {
    this.workTeamForm = this.formBuilder.group({
      name: [''],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.workTeamForm.valid) {
      console.log('Formulario válido', this.workTeamForm.value);
      this.save(this.workTeamForm.value);
    } else {
      console.log('Formulario inválido. Revise los campos.');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido. Revise los campos.'
      });
    }
  }

  async save(workTeam: any) {
    try {
      await this.workTeamService.save(workTeam);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'El equipo de trabajo ha sido guardado correctamente'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al guardar el equipo de trabajo'
      });
    }
  }
}
