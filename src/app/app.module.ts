import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlsComponent } from './components/controls/controls.component';
import { SpecConfigComponent } from './components/spec-config/spec-config.component';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StateService } from './services/state.service';
import { StoreListService } from './services/store-list.service';
import { SpecListService } from './services/spec-list.service';

@NgModule({
  declarations: [
    AppComponent,
    ControlsComponent,
    SpecConfigComponent,
    StoreListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StateService,
    StoreListService,
    SpecListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
