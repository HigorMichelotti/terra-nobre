import { ModelBase } from 'src/app/shared/models/ModelBase';
import { Roles } from '../../../../../shared/models/usuario/roles.model';

export class Usuario extends ModelBase {
  constructor(
    public name?: string,
    public email?: string,
    public ativo?: boolean,
    public role?: Roles
  ) {
    super();
  }

  static fromJson(dadosJson: any): Usuario {
    const usuario = Object.assign(new Usuario(), dadosJson);
    return usuario;
  }
  
  // static fromJson(dadosJson: any): Usuario {
  //     const usuario = Object.assign(new Usuario(), dadosJson);

  //     if (!(dadosJson.grupos)) {
  //         usuario.grupos = new Array<Grupos>();
  //     }

  //     if (usuario.grupos.length > 0) {
  //         console.log("usuario")
  //         usuario.grupos = dadosJson.grupos.map((grupo: Grupos) => Grupos.fromJson(grupo));
  //     }

  //     return usuario;
  // }

  // get classificacaoEmArrayString(): any[] {
  //     return Object.keys(Classificacao).filter(value => isNaN(Number(value)) === false).map((k: any) => {
  //         return { id: Number(k), descricao: Classificacao[k] }
  //     })
  // }

  // get classificacaoEnumString() {
  //     return Object.keys(Classificacao).find((x: any) => Classificacao[x] === this.classificacao);
  // }


}
