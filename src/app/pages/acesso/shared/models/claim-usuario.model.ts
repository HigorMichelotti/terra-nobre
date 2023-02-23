import { ModelBase } from "src/app/shared/models/ModelBase";

export class ClaimUsuario extends ModelBase {
    constructor(
        public usuarioId?: string,
        public tipoClaim?: string,
        public nomeClaim?: string
    ) { 
        super();
     }

    static fromJson(dadosJson: any): ClaimUsuario {
        const claim = Object.assign(new ClaimUsuario(), dadosJson);
        return claim;
    }
}