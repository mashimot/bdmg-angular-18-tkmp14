import { Component, inject } from '@angular/core';
import { finalize, Subscription, switchMap } from 'rxjs';
import { CepFormComponent } from '../../components/cep-form/cep-form.component';
import { CepListComponent } from '../../components/cep-list/cep-list.component';
import { ICep, ICepSpinner } from '../../interfaces/cep.interface';
import { CepService } from '../../services/cep.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cep',
  standalone: true,
  imports: [
    CepListComponent,
    CepFormComponent,
    MatButtonModule
  ],
  templateUrl: './cep.component.html',
  styleUrl: './cep.component.css'
})
export class CepComponent {
  private cepService = inject(CepService);
  public ceps?: ICep[];
  private subscription: Subscription = new Subscription();
  public spinner: ICepSpinner = {
    list: false,
    store: false
  }

  ngOnInit() {
    this.getCeps();
  }

  private getCeps(): void {
    this.spinner.list = true;
    this.subscription.add(
      this.cepService.getCeps()
        .pipe(
          finalize(() => this.spinner.list = false)
        )
        .subscribe(
          response => this.ceps = response
        )
    )
  }

  public onCreateCepFormChange(cep: ICep): void {
    this.spinner.store = true;

    this.cepService.store(cep)
      .pipe(
        switchMap(response => {
          this.spinner.list = true;

          return this.cepService.getCeps().pipe(
            finalize(() => this.spinner.list = false)
          )
        }),
        finalize(() => this.spinner.store = false)
      )
      .subscribe(
        response => this.ceps = response
      )
  }

  public clearTable(): void {
    this.cepService.clear();
    this.getCeps();
  }
}
