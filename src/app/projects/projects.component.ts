// src/app/projects/projects.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Añadir esto
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ModalComponent } from '../shared/modal.component'; // Añadir esto
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FormsModule,    // Añadir esto
    ModalComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  errorMessage: string = '';
  isLoading: boolean = false;
  deleteModalVisible: boolean = false;
  projectToDelete: number | null = null;

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('Is Admin?', this.isAdmin()); // Para debug
    console.log('Current Role:', this.authService.getRole()); // Para debug
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;
    const service = this.isAdmin() ?
      this.projectService.getAllProjects() :
      this.projectService.getUserProjects();

    service.subscribe({
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.handleError(error);
        this.isLoading = false;
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isWorker(): boolean {
    return this.authService.hasRole('ROLE_WORKER');
  }

  isViewer(): boolean {
    return this.authService.hasRole('ROLE_');
  }

  createProject(): void {
    this.router.navigate(['/projects/create']);
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  deleteProject(id: number): void {
    if (confirm('are you sure about delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.projects = this.projects.filter(p => p.id !== id);
        },
        error: (error) => this.handleError(error)
      });
    }
  }

  private handleError(error: any): void {
    this.errorMessage = error.error?.message || 'Ha ocurrido un error';
    console.error('Error:', error);
  }

  showDeleteModal(id: number): void {
    this.projectToDelete = id;
    this.deleteModalVisible = true;
  }

  confirmDeleteProject(): void {
    if (this.projectToDelete !== null) {
      this.deleteProject(this.projectToDelete);
      this.projectToDelete = null;
    }
  }

  cancelDeleteProject(): void {
    this.projectToDelete = null;
  }

  showModal = false;
  modalTitle = '';
  editingProject: Project | null = null;
  newProject: Project = {
    id: 0,
    projectName: '',
    description: '',
    price: 0
  };

  openCreateModal(): void {
    this.modalTitle = 'Create new project';
    this.editingProject = null;
    this.newProject = {
      id: 0,
      projectName: '',
      description: '',
      price: 0
    };
    this.showModal = true;
  }

  openEditModal(project: Project): void {
    this.modalTitle = 'Edit project';
    this.editingProject = { ...project };
    this.showModal = true;
  }

  saveProject(): void {
    if (this.editingProject) {
      this.projectService.updateProject(this.editingProject.id, this.editingProject).subscribe({
        next: (updatedProject) => {
          const index = this.projects.findIndex(p => p.id === updatedProject.id);
          if (index !== -1) {
            this.projects[index] = updatedProject;
          }
          this.showModal = false;
        },
        error: (error) => this.handleError(error)
      });
    } else {
      this.projectService.createProject(this.newProject).subscribe({
        next: (createdProject) => {
          this.projects.push(createdProject);
          this.showModal = false;
        },
        error: (error) => this.handleError(error)
      });
    }
  }
}