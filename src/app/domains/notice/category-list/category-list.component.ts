import { Component, OnInit, inject, signal } from '@angular/core';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../service/category.service';
import { RouterLinkWithHref } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { CategoryCreateComponent } from '../category-create/category-create.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterLinkWithHref,CommonModule,ModalComponent,CategoryCreateComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{
  private categoryService = inject(CategoryService);
  categories = signal<Category[]>([]);
  //categories:Category[]=[];
  isModalOpen = false;
  category!: Category;

  courses = [
    { id: 1, name: "Angular For Beginners" },
    { id: 2, name: "Angular Core Deep Dive" },
    { id: 3, name: "Angular Forms In Depth" },
  ];

  constructor(private toastr: ToastrService){  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data.data);
        console.log(data.data);
      },
      error: () => {},
    });
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        if (response.data) {
         // this.categories = response.data;
          console.log(response.data);
        }
      },
    });
  }

  loadCategory(category: Category) {
    this.category = category;
    this.openModal();
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        this.toastr.success('Registro eliminado');
        this.getCategories();
      },
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.getCategories();
  }
}
