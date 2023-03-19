import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppErrorHandler } from './common/app-error-handler';
import { PostService } from './services/post.service';


@NgModule({
  declarations: [
    AppComponent,
    PostCommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [HttpClientModule,PostService,
    {provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
