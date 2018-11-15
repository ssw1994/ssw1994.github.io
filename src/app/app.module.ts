import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { RoutingModule } from './routing/routing.module';
import 'hammerjs';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { MechComponent } from './mech/mech.component';
import { MailsComponent } from './mails/mails.component';
import { RatingComponent } from './rating/rating.component';
import { ImageGallaryComponent } from './image-gallary/image-gallary.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { CustomcheckboxComponent } from './customcheckbox/customcheckbox.component';
import { ITRComponent } from './itr/itr.component';
import { MultipleMapsComponent } from './multiple-maps/multiple-maps.component';
import { CustomAutocompleteComponent,postCodePipe} from './custom-autocomplete/custom-autocomplete.component';
import { CustomDropComponent } from './custom-drop/custom-drop.component';
import { RulesStepComponent } from './rules-step/rules-step.component';
import { DetailsComponent } from './details/details.component';
import { RuletypeComponent } from './ruletype/ruletype.component';
import { RulefiltersComponent } from './rulefilters/rulefilters.component';
import { RuleconditionComponent } from './rulecondition/rulecondition.component';
import { RuleattributeComponent } from './ruleattribute/ruleattribute.component';
import { RuletestComponent } from './ruletest/ruletest.component';
import { RuleattachmentComponent } from './ruleattachment/ruleattachment.component';
import { RuleapprovalComponent } from './ruleapproval/ruleapproval.component';
import { CustomStepperComponent } from './custom-stepper/custom-stepper.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ChatComponent } from './chat/chat.component';
import { ApiTesterComponent,fileSave } from './api-tester/api-tester.component';
import { ProductCardComponent } from './common-components/product-card/product-card.component';
import { PaginationComponent } from './common-components/pagination/pagination.component';
import { SyncPagination } from "./common-components/pagination/pageSync";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { QtyCounterComponent } from './common-components/qty-counter/qty-counter.component';
import { DetailsGuards } from "./common/routeGuards/detailsGuard";
import { ImgGallaryComponent } from './common-components/img-gallary/img-gallary.component';
import { SyncImage } from './common-components/img-gallary/imgSync';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MapGComponent } from './map-g/map-g.component';
@NgModule({
  declarations: [
    AppComponent,
    MechComponent,
    MailsComponent,
    RatingComponent,
    ImageGallaryComponent,
    AddproductComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent,
    CustomcheckboxComponent,
    ITRComponent,
    MultipleMapsComponent,
    CustomAutocompleteComponent,
    postCodePipe,
    CustomDropComponent,
    RulesStepComponent,
    DetailsComponent,
    RuletypeComponent,
    RulefiltersComponent,
    RuleconditionComponent,
    RuleattributeComponent,
    RuletestComponent,
    RuleattachmentComponent,
    RuleapprovalComponent,
    CustomStepperComponent,
    CalculatorComponent,
    ChatComponent,
    ApiTesterComponent,
    fileSave,
    ProductCardComponent,
    PaginationComponent,
    SyncPagination,
    ProductDetailsComponent,
    QtyCounterComponent,
    ImgGallaryComponent,
    SyncImage,
    MapGComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    SharedModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents:[fileSave],
  providers: [DetailsGuards],
  bootstrap: [AppComponent]
})
export class AppModule { }
