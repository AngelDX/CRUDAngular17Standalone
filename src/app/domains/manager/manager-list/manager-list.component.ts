import { Component, inject, signal } from '@angular/core';
import { ManagerService } from '../../../service/manager.service';
import { Manager } from '../../../models/manager';
import { ToastrService } from 'ngx-toastr';
import { ManagerCreateComponent } from '../manager-create/manager-create.component';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-manager-list',
  standalone: true,
  imports: [RouterLinkWithHref,CommonModule,ModalComponent,ManagerCreateComponent],
  templateUrl: './manager-list.component.html',
  styleUrl: './manager-list.component.css'
})
export class ManagerListComponent {

  private managerService=inject(ManagerService);
  managers = signal<Manager[]>([]);
  isModalOpen = false;
  manager!: Manager;

  constructor(private toastr: ToastrService){  }

  ngOnInit() {
    this.getManagers();
  }

  getManagers() {
    this.managerService.getAll().subscribe({
      next: (data) => {
        this.managers.set(data.data);
        console.log(data.data);
      },
      error: () => {},
    });
  }


  loadCategory(manager: Manager) {
    this.manager = manager;
    this.openModal();
  }

  deleteCategory(id: number) {
    this.managerService.deleteManager(id).subscribe({
      next: (response) => {
        this.toastr.success('Registro eliminado');
        this.getManagers();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.getManagers();
  }
}
