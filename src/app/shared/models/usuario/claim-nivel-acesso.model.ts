import { ModelBase } from "../ModelBase";
import { Claim } from "./claim.model";

export class ClaimNivelAcesso extends ModelBase {
    constructor(
        public nome?: string,
        public claims?: Array<Claim>
    ) {
        super();
    }

    static fromJson(dadosJson: any): ClaimNivelAcesso {
        return Object.assign(new ClaimNivelAcesso(), dadosJson);
    }
}