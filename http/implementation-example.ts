import { ResponseInterface } from "../../shared/http/response-interface";
export class Users extends ResponseInterface {
    name: string;
    age: number;
}

import { HttpInterface } from "../../shared/http/http-interface";
import { Users } from "./login.model";
import { HttpClient } from '@angular/common/http';
import { Serializer } from "../../shared/http/serializer-interface";
import { Injectable } from '@angular/core';

export class UsersSerializer implements Serializer{
    fromJson(json: any): Users {
        console.dir(json);
      const user = new Users();
      user.age = json.age;
      user.name = json.name;
      return user;
    }
  
    toJson(user: Users): any {
      return {
        age: user.age,
        name: user.name
      };
    }
}


@Injectable()
export class LoginService extends HttpInterface<Users> {

    constructor(private http:HttpClient){
        super(http,'users',new UsersSerializer())
    }
}
