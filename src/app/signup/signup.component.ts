import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import $ from "jquery";
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;
    constructor(private translate: TranslateService,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');
    }

    ngOnInit() {
        let AccessToken = localStorage.getItem("token");
        if (AccessToken) {
            this.router.navigate(['/dashboard']);
        }
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
                validator: MustMatch('password', 'confirmPassword')
            });
    }
    get f() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.valid) {
            let formValue = this.registerForm.value;
            let RegisternObj = {
                "firstname": formValue.firstName,
                "lastname": formValue.lastName,
                "email": formValue.email,
                "password": formValue.password
            }
            console.log("RegisternObj", RegisternObj);
            this.http.post(`${environment.API_Path}/AdminAPI/register`, RegisternObj).subscribe(
                res => {
                  console.log("register data", res);
                  if (res["success"] == true) {
                    console.log(res["message"]);
                    $("#registration-status").html(res["message"]).css("color", "#1dde1d");
                    // $("#registration-status").after("<a class='login-link' href='/'>Login Now</a>")
                    this.registerForm.reset();
                    for (let name in this.registerForm.controls) {
                      this.registerForm.controls[name].setErrors(null);
                    }
                  }
                  else {
                    console.log(res["message"]);
                    $("#registration-status").html(res["message"]).css("color", "#ea4050");
                  }
        
                }
              );
        }
        else {
            return;
        }

    }
}

export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}