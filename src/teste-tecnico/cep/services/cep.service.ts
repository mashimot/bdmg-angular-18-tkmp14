import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { ICep } from '../interfaces/cep.interface';

@Injectable({
	providedIn: 'root'
})
export class CepService {
	private readonly BASE_URL = 'https://viacep.com.br/ws/';
	private readonly LOCAL_STORAGE_KEY = 'ceps';
	private http = inject(HttpClient);

	constructor() { }

	public getCep(cepNumber: string): Observable<ICep> {
		return this.http.get<ICep>(`${this.BASE_URL}${cepNumber}/json/`);
	}

	public store(cep: ICep): Observable<boolean> {
		return this.getCeps().pipe(
			map(ceps => {
				ceps.push(cep);
				this.saveCeps(ceps);
				return true;
			}),
			delay(1000)
		);
	}

	public clear(): void {
		this.saveCeps([]);
	}

	public getCeps(): Observable<ICep[]> {
		const ceps = this.loadCeps();
		return of(ceps).pipe(
			delay(1500)
		)
	}

	private loadCeps(): ICep[] {
		const ceps = localStorage.getItem(this.LOCAL_STORAGE_KEY);
		return ceps ? JSON.parse(ceps) : [];
	}

	private saveCeps(ceps: ICep[]): void {
		localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(ceps));
	}
}
