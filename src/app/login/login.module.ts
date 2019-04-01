import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule, ReactiveFormsModule,HttpClientModule,HttpModule,
        LoginRoutingModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
