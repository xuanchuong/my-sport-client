import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../core/auth/user";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    registerForm: FormGroup;
    error: string;
    submitted = false;
    loading = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            matchingPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }
        const user = new User();
        user.email = this.registerForm.value.email;
        user.firstName = this.registerForm.value.firstName;
        user.lastName = this.registerForm.value.lastName;
        user.password = this.registerForm.value.password;
        user.matchingPassword = this.registerForm.value.matchingPassword;
        this.userService.create(user)
            .then(createdUser => {
                if (createdUser == undefined) {
                    throw new Error("register fail");
                }
            console.log("register successfully: " + createdUser);
            this.loading = true;
            this.router.navigate(['/login']).then(() => {
            });
        })
            .catch(() => {
                alert("register fail");
            })

    }
}
