import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  private dateAniversario: String
  private dateCadastro: String
  private tipo_id: String
  private user_cadastro: String
  private user_cpf: String
  private user_data: String
  private user_email: String
  private user_foto_perfil: String
  private user_id: String
  private user_nome: String
  private user_status: String
  private user_telefone: String

  constructor(public http: HttpClient) {
  }


}
