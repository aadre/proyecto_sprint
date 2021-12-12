import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Empleado, Empresa } from '../models';
import { EmpleadoRepository } from '../repositories';
import { Llaves } from "../config/llaves";
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AntenticacionService {
  constructor(/* Add @inject to inject parameters */
    @repository(EmpleadoRepository)
    public EmpleadoRepository: EmpleadoRepository 
  ) {}
  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(4, false);
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarEmpleado(usuario: string, clave: string){
    try{
      let p = this.EmpleadoRepository.findOne({where:{Email: usuario,clave: clave}})
      if(p){
        return p;
      }
      return false;
    }catch{
      return false;
    }
  }

  GenerarTokenJWT(empleado: Empleado){
    let token = jwt.sing({
      data:{
        id: empleado.id, 
        email: empleado.Email,
        nombre: empleado.Nombres + " " + empleado.Apellidos,
      }
    },
      Llaves.claveJWT);
    return token;
  }
  ValidarTokenJWT(token: string) {
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos; 
    }catch{
      return false;
    }
  }
}
