
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";


import { TodoRoutingModule } from "./todo-routing.module";
import { TodoComponent } from "./todo.component";

@NgModule({
    imports: [
        TNSCheckBoxModule,
        NativeScriptCommonModule,
        TodoRoutingModule
    ],
    declarations: [
        TodoComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TodoModule { }
