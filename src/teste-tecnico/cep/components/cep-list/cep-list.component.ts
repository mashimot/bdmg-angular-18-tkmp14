import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ICep, ICepSpinner } from '../../interfaces/cep.interface';
import { CepService } from '../../services/cep.service';

@Component({
  selector: 'app-cep-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule
  ],
  templateUrl: './cep-list.component.html',
  styleUrl: './cep-list.component.css'
})
export class CepListComponent {
  @Input() ceps?: ICep[];
  @Input() spinner?: ICepSpinner;

  public displayedColumns: string[] = ['cep', 'logradouro', 'bairro'];
  public dataSource : MatTableDataSource<ICep> = new MatTableDataSource<ICep>(this.ceps || []);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ceps'].currentValue) {
      this.dataSource = new MatTableDataSource<ICep>(this.ceps);;
    }
  }
}
