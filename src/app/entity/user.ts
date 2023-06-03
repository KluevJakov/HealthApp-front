import { Role } from "./role";

export class User {
  id!: number;
  email!:string;
  name!:string;
  phone!:string;
  address!:string;
  roles!:Array<Role>;
  about!:string;
  edu!:string;
  prof!:string;
  password!:string;
  avatar!:string;

  constructor(user:any){
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.address = user.address;
    this.phone = user.phone;
    this.roles = user.roles;
    this.about = user.about;
    this.edu = user.edu;
    this.prof = user.prof;
    this.password = user.password;
    this.avatar = user.avatar;
  }
}