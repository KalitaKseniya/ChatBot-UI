import { NgModule } from "@angular/core";
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
    imports: [HttpClientModule,
              FormsModule,
              ReactiveFormsModule],
    exports: [HttpClientModule,
              FormsModule,
              ReactiveFormsModule],
    declarations: [
    ]
})

export class SharedModule{


}
