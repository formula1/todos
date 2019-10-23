
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo.component";

import {
   MomentPipe
} from '../util/moment'


@NgModule({
    imports: [
        TNSCheckBoxModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        TodoRoutingModule
    ],
    declarations: [
        TodoComponent,
        MomentPipe
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TodoModule { }
