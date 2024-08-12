import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ServicioApiService } from '../../services/servicio-api.service';

@Component({
  selector: 'app-gestionar-categorias',
  templateUrl: './gestionar-servicios.component.html',
  styleUrls: ['./gestionar-servicios.component.scss']
})
export class GestionarServiciosComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private servicioService: ServicioApiService,
    private dashboardApiService: DashboardApiService
    ) { }
  public filterForm!: FormGroup;
  public servicioForm!: FormGroup;
  
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public servicios = [];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      name: ['', [Validators.maxLength(30)]],
    })
    this.servicioForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      price :['', [Validators.required]],
    })
  }

  showModalCrear(): void {
    this.servicioForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  filterCategoria(): void {
    this.hasFirstFilter = true;
    this.servicioService.getServiciosByFilter({...this.dashboardApiService.getParams(this.filterForm.value), skip:0, rowsPerPage:1000}).subscribe({
      next: (data) => {
        this.servicios = data.registros;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los servicios' });
      }
    })
  }

  saveCategoria(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioService.save(this.servicioForm.value).subscribe({
          next: (data) => {
            this.closeModalCrear();
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha registrado exitosamente' });
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido realizar el registro' });
          }
        })

      }
    });
  }

}
