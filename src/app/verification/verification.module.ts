import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { VerificationRoutingModule } from './verification-routing.module';
import { VerificationComponent } from './verification.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    VerificationRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [VerificationComponent]
})
export class VerificationModule { }
