import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routerTransition } from '../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { environment } from '../../environments/environment';
import { Http , Headers} from '@angular/http';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
    animations: [routerTransition()]
})
export class VerificationComponent implements OnInit {
    public email: string;
    public AccessToken : string;
    verifypwdForm: FormGroup;
    submitted = false;
    verificationmodel: any;

    constructor(private translate: TranslateService,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private http: Http,
        public router: Router) {
        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.verificationmodel = {
            "password": '',
            "confirmPassword": ''
        }
    }

    ngOnInit() {
        let AccessToken = localStorage.getItem("token");
        if (AccessToken) {
            this.router.navigate(['/dashboard']);
        }
        this.verifypwdForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        }, {
                validator: MustMatch('password', 'confirmPassword')
        });
    }
    get f() { return this.verifypwdForm.controls; }
    onSubmit(o) {

        this.submitted = true;
        this.activatedRoute.queryParams.subscribe(params => {
            this.AccessToken = params['token'];
            // console.log("token:---", this.AccessToken);
      
          });
          if (this.verifypwdForm.valid) {              
            let headers = new Headers();
            headers.append('Access-Control-Allow-Headers', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            headers.append('Accept', 'application/json');
            headers.append('Authorization', this.AccessToken);
            let verifypwdObj = {
                "password": o.password
            }
            this.http.post(`${environment.API_Path}/AdminAPI/forgot/changepassword`, verifypwdObj, { headers: headers }).pipe(map((res => res.json()))).subscribe(data => {
                console.log("verification-Data", data);
                if (data.success == true) {
                  $("#verifypwdForm-status").html(data.message).css("color", "#1dde1d");
                  $("#verifypwdForm-status").after("<a class='login-page-link' href='/'>Login Now</a>")
                  this.verifypwdForm.reset();
                  for (let name in this.verifypwdForm.controls) {
                    this.verifypwdForm.controls[name].setErrors(null);
                  }
        
                } else {
                  $("#verifypwdForm-status").html(data.message).css("color", "#ea4050");
                }
        
              });
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