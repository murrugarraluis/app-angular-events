import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth.service";
import {LoginRequest} from "../../../interfaces/request/login-request.interface";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    loginForm: FormGroup;
    invalidCredentials = false;

    constructor(private fb: FormBuilder,
                private router: Router,
                private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        setTimeout(() => {
            this.loginForm.patchValue({
                email: 'admin@app.com',
                password: '123456'
            });
        }, 1000);
    }

    get invalidLogin() {
        return (this.loginForm.get('email').invalid && this.loginForm.get('email').touched)
            || this.invalidCredentials
    }

    onSubmit() {
        // console.log(this.loginForm)
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const payload: LoginRequest = this.loginForm.value
        this.authService.login(payload).subscribe({
            next: response => {
                this.authService.setToken(response.token)
                this.router.navigateByUrl('admin')
            },
            error: err => {
                this.invalidCredentials = true;
                this.loginForm.markAllAsTouched();
            }
        })
    }
}
