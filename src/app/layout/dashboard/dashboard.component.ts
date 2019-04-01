import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public data : any;
    

    constructor(public router: Router,
        private http: Http) { }

    ngOnInit() {
        this.getUserData();
        
    }
    getUserData(){
        let AccessToken = localStorage.getItem("token");
        console.log("AccessToken-Dashboard", AccessToken);
        if (AccessToken == '' || AccessToken == null || AccessToken == undefined) {
            this.router.navigate(['/login']);
        }
        
        let headers = new Headers();
        // headers.append('Access-Control-Allow-Headers', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        // headers.append('Accept', 'application/json');
        headers.append('Authorization', AccessToken);

        this.http.get(`${environment.API_Path}/AdminAPI/GetRegistractionUserList?pageNo=1&size=10`, { headers: headers }).pipe(map((res => res.json()))).subscribe(data => {
            console.log("registerUserData",data.data );
            this.data = data.data;
        });
    }
}

