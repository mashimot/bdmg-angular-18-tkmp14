import { JsonPipe, NgIf } from '@angular/common';
import {
    Component,
    EventEmitter,
    inject,
    Input,
    OnInit,
    Output
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CepDirective } from '../../directives/cep.directive';
import { ICep, ICepSpinner } from '../../interfaces/cep.interface';

@Component({
    selector: 'app-cep-form',
    templateUrl: './cep-form.component.html',
    styleUrls: ['./cep-form.component.css'],
    standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
        JsonPipe,
        CepDirective,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        NgxMaskDirective,
        NgxMaskPipe,
    ]
})
export class CepFormComponent implements OnInit {
    private formBuilder = inject(FormBuilder);

    form!: FormGroup;
    formSubmitAttempt: boolean = false;

    @Input() spinner?: ICepSpinner;
    @Output() public createCepForm: EventEmitter<ICep> = new EventEmitter();

    ngOnInit(): void {
        this.buildForm();
    }

    private buildForm(): void {
        this.form = this.formBuilder.group({
            "cep": ['', [Validators.required]],
            "logradouro": ['', [Validators.required]],
            "complemento": ['', []],
            "unidade": ['', []],
            "bairro": ['', [Validators.required]],
            "localidade": ['', [Validators.required]],
            "uf": ['', [Validators.required]],
            "estado": ['', [Validators.required]],
            "regiao": ['', [Validators.required]],
            "ibge": [{ value: '', disabled: true }, []],
            "gia": ['', []],
            "ddd": ['', [Validators.required]],
            "siafi": [{ value: '', disabled: true }, []],
        });
    }

    onSubmit(): void {
        this.formSubmitAttempt = true;
        if (this.f.valid) {
            this.createCepForm.emit(this.f.value);
            console.log('form submitted');
        } else {
            this.validateAllFormFields(this.f);
        }
    }

    onCepChange($event: ICep): void {
        this.f.patchValue({
            "logradouro": $event.logradouro,
            "complemento": $event.complemento,
            "unidade": $event.unidade,
            "bairro": $event.bairro,
            "localidade": $event.localidade,
            "uf": $event.uf,
            "estado": $event.estado,
            "regiao": $event.regiao,
            "ibge": $event.ibge,
            "gia": $event.gia,
            "ddd": $event.ddd,
            "siafi": $event.siafi,
        });
    }

    validateAllFormFields(control: AbstractControl): void {
        if (control instanceof FormControl) {
            control.markAsTouched({
                onlySelf: true
            });
        } else if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach((field: string) => {
                const groupControl = control.get(field)!;
                this.validateAllFormFields(groupControl);
            });
        } else if (control instanceof FormArray) {
            const controlAsFormArray = control as FormArray;
            controlAsFormArray.controls.forEach((arrayControl: AbstractControl) => this.validateAllFormFields(arrayControl));
        }
    }

    isFieldInvalid(control: FormControl): boolean {
        return control?.invalid && control?.touched;
    }

    get f(): FormGroup {
        return this.form as FormGroup;
    }

    get cep(): FormControl {
        return this.f.get(['cep']) as FormControl;
    }
    get logradouro(): FormControl {
        return this.f.get(['logradouro']) as FormControl;
    }
    get complemento(): FormControl {
        return this.f.get(['complemento']) as FormControl;
    }
    get unidade(): FormControl {
        return this.f.get(['unidade']) as FormControl;
    }
    get bairro(): FormControl {
        return this.f.get(['bairro']) as FormControl;
    }
    get localidade(): FormControl {
        return this.f.get(['localidade']) as FormControl;
    }
    get uf(): FormControl {
        return this.f.get(['uf']) as FormControl;
    }
    get estado(): FormControl {
        return this.f.get(['estado']) as FormControl;
    }
    get regiao(): FormControl {
        return this.f.get(['regiao']) as FormControl;
    }
    get ibge(): FormControl {
        return this.f.get(['ibge']) as FormControl;
    }
    get gia(): FormControl {
        return this.f.get(['gia']) as FormControl;
    }
    get ddd(): FormControl {
        return this.f.get(['ddd']) as FormControl;
    }
    get siafi(): FormControl {
        return this.f.get(['siafi']) as FormControl;
    }

}