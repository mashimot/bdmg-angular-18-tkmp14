import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CepComponent } from '../teste-tecnico/cep/containers/cep/cep.component';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelloComponent, MatExpansionModule, CepComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BDMG Teste Frontend';
  panelOpenState: boolean = true;
  @Input() name!: string;
}
