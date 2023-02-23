import { ModelBase } from "../ModelBase";

export class Claim extends ModelBase {
    constructor(
        public nome?: string,
        public tipo?: string,
        public selecionado?: false
    ) { 
        super();
     }

    static fromJson(dadosJson: any): Claim {
        return Object.assign(new Claim(), dadosJson);
    }
}