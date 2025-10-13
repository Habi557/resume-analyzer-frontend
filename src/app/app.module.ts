import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UploadresumeComponent } from './components/uploadresume/uploadresume.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './Interceptor/loading.interceptor';
import { ResumemodelComponent } from './helperclass/resumemodel/resumemodel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import { CustomdateformatPipe } from './pipes/customdateformat.pipe';
import { ColorchangeForSelectedstatusPipe } from './pipes/colorchange-for-selectedstatus.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UploadresumeComponent,
    SpinnerComponent,
    ResumemodelComponent,
    ChatbotComponent,
    StatsCardComponent,
    CustomdateformatPipe,
    ColorchangeForSelectedstatusPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true
    })
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
