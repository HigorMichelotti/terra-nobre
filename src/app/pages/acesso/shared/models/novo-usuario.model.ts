import { ModelBase } from "src/app/shared/models/ModelBase";

export class NovoUsuario extends ModelBase {
    constructor(
        public nome?: string,
        public cpf?: string,
        public email?: string,
        public senha?: string,
        public confirmacaoSenha?: string,
        public localId?: any,
    ) {
        super();
    }

    static fromJson(dadosJson: any): NovoUsuario {
        const usuario = Object.assign(new NovoUsuario(), dadosJson);
        return usuario;
    }
}