import { CommonModule, DatePipe } from "@angular/common";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list/user-list.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { UsersRouting } from "./users.routing";
import { CustomMaterialModule } from "src/app/layout/dashboard/custom-materials.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CdkTableModule } from "@angular/cdk/table";
import { UsersService } from "./users.service";

@NgModule({
    declarations: [UserListComponent, EditUserComponent],
    imports: [
        CommonModule,
        FormsModule,
        CustomMaterialModule,
        FlexLayoutModule,
        UsersRouting,
        ReactiveFormsModule,
        CdkTableModule
    ],
    providers: [DatePipe, UsersService]
})

export class UsersModule { }