import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  images: string[] = [
    '../../../../Images/PRINCIPAL.jpg',
    '../../../../Images/Robots-Implications-Business-speaker.jpg',
    '../../../../Images/Project_Home.jpg',
    '../../../../Images/Robotic_machine.jpg',
    '../../../../Images/Industrial_machinery.jpg'  // Asegúrate de tener esta imagen
  ];
  currentImageIndex: number = 0;

  changeImage(direction: number): void {
    this.currentImageIndex =
      (this.currentImageIndex + direction + this.images.length) % this.images.length;
  }

  setImage(index: number): void {
    this.currentImageIndex = index;
  }

  isActive(index: number): boolean {
    return this.currentImageIndex === index;
  }
}