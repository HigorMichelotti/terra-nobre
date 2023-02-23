import { ModelBase } from 'src/app/shared/models/ModelBase';
import { UsuarioLogadoDadosAcesso } from './usuario-logado-dados-acesso.model';

export class UsuariosLogado extends ModelBase {

    constructor(
        public tokenAcesso?: string,
        public expiracaoEmHoras?: number,
        public dadosUsuario?: UsuarioLogadoDadosAcesso
    ) {
        super();
    }

    static fromJson(dadosJson: any): UsuariosLogado {
        const usuario = Object.assign(new UsuariosLogado(), dadosJson);
        return usuario;
    }

}