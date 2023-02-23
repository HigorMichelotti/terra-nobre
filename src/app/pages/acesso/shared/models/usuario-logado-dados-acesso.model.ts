import { ModelBase } from 'src/app/shared/models/ModelBase';
import { ClaimUsuario } from './claim-usuario.model';

export class UsuarioLogadoDadosAcesso extends ModelBase {
    constructor(
        public email?: string,
        public nome?: string,
        public claims?: Array<ClaimUsuario>,
    ) {
        super();
    }

    static fromJson(dadosJson: UsuarioLogadoDadosAcesso) {
        return Object.assign(new UsuarioLogadoDadosAcesso, dadosJson);
    }
}