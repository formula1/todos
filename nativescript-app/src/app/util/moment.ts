import * as moment from "moment";

import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'MomentPipe'})

export class MomentPipe implements PipeTransform {
   transform(value: number, format: string): string {
     return moment(value).format(format || "dddd, MMMM Do YYYY, h:mm:ss a")
   }
}
