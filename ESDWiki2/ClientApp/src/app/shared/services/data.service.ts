import { Injectable } from "@angular/core";
import { User } from "../user";

@Injectable()

export class DataService {
  selectedUserToEdit: User
}
