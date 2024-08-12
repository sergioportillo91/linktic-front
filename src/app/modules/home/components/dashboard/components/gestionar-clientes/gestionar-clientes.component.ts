import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DashboardApiService } from '../../services/dashboard-api.service';
import { ClientApiService } from '../../services/cliente-api.service.ts.service';

@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./gestionar-clientes.component.scss']
})
export class GestionarClientesComponent {
  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private clienteApiService: ClientApiService,
    private dashboardApiService: DashboardApiService
    ) { }
  public filterForm!: FormGroup;
  public clienteForm!: FormGroup;
 
  public showModal: boolean = false;
  public hasFirstFilter: boolean = false;

  public clientes = [];

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.filterForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      identification: [''],
    })
    this.clienteForm = this.fb.group({
      identification: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required]],
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  showModalCrear(): void {
    this.clienteForm.reset();
    this.showModal = true;
  }

  closeModalCrear(): void {
    this.showModal = false;
  }

  filterCliente(): void {
    this.hasFirstFilter = true;
   
    this.clienteApiService.getClientesByFilter({...this.dashboardApiService.getParams(this.filterForm.value), skip:0, rowsPerPage:1000}).subscribe({
      next: (data) => {
        this.clientes = data.registros
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido cargar los registros' });
      }
    })
  }

  saveCliente(): void {
    let cliente = {
      identification: this.clienteForm.value.identification,
      firstName: this.clienteForm.value.firstName,
      lastName: this.clienteForm.value.lastName,
      email: this.clienteForm.value.email,
      phone: this.clienteForm.value.phone,
      user: {
        username: this.clienteForm.value.username,
        password: this.clienteForm.value.password,
        role: 'ROLE_USER'
      }
    }

    this.confirmationService.confirm({
      message: '¿Está seguro que desea crear el cliente?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clienteApiService.saveCliente(cliente).subscribe({
          next: (data) => {
            this.closeModalCrear();
            this.filterCliente();
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
