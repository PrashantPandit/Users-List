import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()

export class UsersService { 

    constructor(private angularDatePipe: DatePipe) {}

    dateFormater(date) {
        return this.angularDatePipe.transform(new Date(date), 'yyyy-MM-dd');
    }
}