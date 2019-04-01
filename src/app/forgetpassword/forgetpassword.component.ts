import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-forgetpassword',
    templateUrl: './forgetpassword.component.html',
    styleUrls: ['./forgetpassword.component.scss'],
    animations: [routerTransition()]
})
export class ForgetpasswordComponent implements OnInit {
    public email: string;
    forgetpwdForm: FormGroup;
    submitted = false;
    forgetpwdmodel: any;

    constructor(private translate: TranslateService,
        private formBuilder: FormBuilder,
        private http: Http,
        public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.forgetpwdmodel = {
            "email": ''
        }
    }

    ngOnInit() {
        let AccessToken = localStorage.getItem("token");
        if (AccessToken) {
            this.router.navigate(['/dashboard']);
        }
        this.forgetpwdForm = this.formBuilder.group({

            email: ['', [Validators.required, Validators.email]],
        });
    }
    get f() { return this.forgetpwdForm.controls; }
    onSubmit(o) {

        this.submitted = true;
        // stop here if form is invalid
        if (this.forgetpwdForm.valid) {
            let params = {
                email: o.email
            }
            this.http.get(`${environment.API_Path}/AdminAPI/forgotpassword`, { params: params }).pipe(map((res => res.json()))).subscribe(data => {
                if (data.success == true) {
                    // this.forgetpwdmodel = {
                    //     "email": ''
                    // }
                    $("#forgetpwdForm-status").html(data.message).css("color", "#1dde1d");
                    $("#forgetpwdForm-status").after("<a class='login-page-link' href='/'>Login Now</a>")
                    this.forgetpwdForm.reset();
                    for (let name in this.forgetpwdForm.controls) {
                        this.forgetpwdForm.controls[name].setErrors(null);
                    }
                }
                else {
                    $("#forgetpwdForm-status").html(data.message).css("color", "#ea4050");
                }
            });
        }
        else {
            return;
        }

    }
}

