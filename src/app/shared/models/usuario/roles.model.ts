import { ModelBase } from "../ModelBase";

export class Roles extends ModelBase {
    constructor(
        public nome?: string,
    ) { 
        super();
     }

    static fromJson(dadosJson: any): Roles {
        return Object.assign(new Roles(), dadosJson);
    }
}