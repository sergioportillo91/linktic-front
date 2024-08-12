import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ClientApiService } from '../../services/cliente-api.service.ts.service';
import { ServicioApiService } from '../../services/servicio-api.service';
import { ReservaApiService } from '../../services/reserva-api.service';

@Component({
  selector: 'app-gestionar-productos',
  templateUrl: './gestionar-reservas.component.html',
  styleUrls: ['./gestionar-reservas.component.scss']
})
export class GestionarReservasComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private servicioApi: ServicioApiService,
    private reservaApiService: ReservaApiService,
    private dashboardApiService: DashboardApiService,
    private clienteApiService: ClientApiService,
    ) { }
  public filterForm!: FormGroup;
  public reservaForm!: FormGroup;

  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;
  public modo!: string;
  public reservaId!: number;

  public clientes = [];
  public servicios = [];
  public reservas = [];

  ngOnInit(): void {
    this.initForm();
    this.filterClientes()
    this.filterServicios()
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      customer: [''],
      service: [''],
      reservationDate: [''],
    })
    this.reservaForm = this.fb.group({
      customer: ['', [Validators.required]],
      service: ['', [Validators.required]],
      starDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    })
  }

  showModalCrear(): void {
    this.reservaForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }


  public crearReserva(): void {
    this.modo = 'CREAR';
    this.showModalCrear();
  }

  public editarReserva(reserva: any,operacion:string): void {
    this.reservaId = reserva.id;
    this.reservaForm.controls['customer'].setValue(reserva.customer.id)
    this.reservaForm.controls['service'].setValue(reserva.service.id)
    this.reservaForm.patchValue({
      starDate:this.convertStringToDate(reserva.starDate),
      endDate: this.convertStringToDate(reserva.endDate),
    });
    
    this.modo = 'EDITAR';
    this.showModal = true;
  }

  public cancelarReserva(id: number){

    this.confirmationService.confirm({
      message: '¿Está seguro que desea cancelar la reserva?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.reservaApiService.cancel(id).subscribe({
          next: (data) => {
            this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha registrado exitosamente' });
            this.filterReserva();
          },
          error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cancelar la reserva' });
          }
        })
      }
    })
  }

  filterReserva(): void {
    this.hasFirstFilter = true;
   
    this.reservaApiService.getReservasByFilter({...this.dashboardApiService.getParams(this.filterForm.value), skip: 0, rowsPerPage:1000}).subscribe({
      next: (data) => {
        this.reservas = data.registros;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterClientes(): void {
   
    this.clienteApiService.getClientesByFilter({ skip:0, rowsPerPage:1000}).subscribe({
      next: (data) => {
        this.clientes = data.registros
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  filterServicios(): void {
    this.servicioApi.getServiciosByFilter({skip:0, rowsPerPage:1000}).subscribe({
      next: (data) => {
        this.servicios = data.registros;
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los servicios' });
      }
    })
  }

  saveReserva(): void {

    let data = {
      customer: {
          id: this.reservaForm.value.customer
      },
      service: {
          id: this.reservaForm.value.service
      },
      reservationDate: new Date().toISOString(),
      starDate: this.reservaForm.value.starDate,
      endDate: this.reservaForm.value.endDate,
      state: 'RESERVADO'
    }


    this.confirmationService.confirm({
      message: this.modo == 'CREAR' ? '¿Está seguro que desea crear la reserva?': '¿Está seguro que desea editar la reserva?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        if(this.modo == 'CREAR'){
          this.reservaApiService.save(data).subscribe({
            next: (data) => {
              this.filterReserva()
              this.closeModalCrear();
              this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha registrado exitosamente' });
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido realizar el registro' });
            }
          })
        }else{
          this.reservaApiService.update(data,this.reservaId).subscribe({
            next: (data) => {
              this.filterReserva()
              this.closeModalCrear();
              this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se ha editado exitosamente' });
            },
            error: (error) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido realizar el registro' });
            }
          })

        }

      }
    });
  }

  convertStringToDate(dateStr: string): Date {
    const [day, month, year] = dateStr.split('/');
    return new Date(+`20${year}`, +month - 1, +day);
  }

 public eliminar(id: number): void {
  this.confirmationService.confirm({
    message: '¿Está seguro que desea eliminar la reserva?',
    header: 'Confirmación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      this.reservaApiService.delete(id).subscribe({
        next: (data) => {
          this.closeModalCrear();
          this.filterReserva()
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se eliminó con exito' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido eliminar el registro' });
        }
      })
    }
  });
 }
}
