import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { CepComponent } from '../teste-tecnico/cep/containers/cep/cep.component';
import { PortfolioComponent } from '../teste-tecnico/portfolio/components/portfolio/portfolio.component';
import { HelloComponent } from './hello.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HelloComponent, MatExpansionModule, CepComponent, PortfolioComponent, MatDividerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'BDMG Teste Frontend';
  panelOpenState: boolean = true;
  @Input() name!: string;
}
