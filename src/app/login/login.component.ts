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
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    constructor(
        private translate: TranslateService,
        private formBuilder: FormBuilder,
        public router: Router,
        private http: Http
        ) {
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
        this.loginForm = this.formBuilder.group({            
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        
        this.submitted = true;
        if (this.loginForm.valid) {
            let loginObj = {
                "email": this.loginForm.value.email,
                "password": this.loginForm.value.password
            };
            // console.log("logindata", loginObj);
            this.http.post(`${environment.API_Path}/AdminAPI/login`, loginObj).pipe(map((res => res.json()))).subscribe(data => {
                console.log("logindata", data);
                if (data.success == true) {            
                    $("#login-status").html(data.message).css("color", "#1dde1d");
                    this.loginForm.reset();
                    this.loginForm.markAsPristine();                
                    localStorage.setItem('token', data.token);
                    this.router.navigate(["/dashboard"]);
                    
                } else {
                    $("#login-status").html(data.message).css("color", "#ea4050");
                }
            });
        }

      
    }
    
}
