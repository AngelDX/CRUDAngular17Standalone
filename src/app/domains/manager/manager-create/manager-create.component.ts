import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { Manager } from '../../../models/manager';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../../service/manager.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeasonService } from '../../../service/season.service';
import { Season } from '../../../models/season';

@Component({
  selector: 'app-manager-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './manager-create.component.html',
  styleUrl: './manager-create.component.css'
})

export class ManagerCreateComponent {
  @Input() data: Manager | null = null;
  @Output() onCloseModal = new EventEmitter();
  dataForm!: FormGroup;
  seasons = signal<Season[]>([]);

  constructor(private fb: FormBuilder,private managerService:ManagerService,private toastr:ToastrService, private seasonService:SeasonService){
    this.dataForm = this.fb.group({
      fullname: new FormControl('', [Validators.required]),
      position: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      cellphone: new FormControl('', [Validators.required]),
      season_id: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.getSeasons();
  }

  getSeasons() {
    this.seasonService.getAll().subscribe({
      next: (data) => {
        this.seasons.set(data.data);
        console.log(data.data);
      },
      error: () => {},
    });
  }

  ngOnChanges(): void {
    if (this.data) {
      this.dataForm.patchValue({
        fullname: this.data.fullname,
        position: this.data.position,
        dni: this.data.dni,
        birthdate: this.data.birthdate,
        email: this.data.email,
        cellphone: this.data.cellphone,
        season_id: this.data.season_id,
      });
    }
  }

  onSubmit() {
    console.log(this.dataForm);
    if (this.dataForm.valid) {
      if (this.data) {
        this.managerService.updateManager(this.data.id, this.dataForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetdataForm();
              this.toastr.success("Registro actualizado!");
            },
          });

      } else {
        this.managerService.createManager(this.dataForm.value).subscribe({
          next: (response: any) => {
            this.resetdataForm();
            this.toastr.success('Registro creado!');
          },
        });
      }
    } else {
      this.dataForm.markAllAsTouched();
    }
  }

  onClose() {
    this.onCloseModal.emit(false);
  }

  resetdataForm() {
    this.dataForm.reset();
    this.onClose();
  }
}
