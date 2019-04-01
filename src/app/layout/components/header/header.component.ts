import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public firstname : string;
    public lastname : string;
    public pushRightClass: string;

    constructor(private translate: TranslateService,
        public router: Router,
        private http: Http,
        private cookieService: CookieService) {

        this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS/) ? browserLang : 'en');

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        let AccessToken = localStorage.getItem("token");
        // console.log("AccessToken-header", AccessToken);
        if (AccessToken) {        
        let headers = new Headers();
        headers.append('Access-Control-Allow-Headers', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', AccessToken);

        this.http.get(`${environment.API_Path}/AdminAPI/dashboard`, { headers: headers }).pipe(map((res => res.json()))).subscribe(data => {
            this.firstname = data.data.firstname;
            this.lastname = data.data.lastname
            // console.log("Dashboard-Data", data.data);
        });
    }
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        // localStorage.removeItem('isLoggedin');
        localStorage.removeItem('token');
        // this.cookieService.delete('token');
        this.router.navigate(["/login"]);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
