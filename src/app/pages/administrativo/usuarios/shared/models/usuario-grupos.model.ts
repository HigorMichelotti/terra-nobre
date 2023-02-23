import { ModelBase } from 'src/app/shared/models/ModelBase';

export class Grupos extends ModelBase {
    constructor(
        public nome?: string,
        public ativo?: boolean,
    ) {
        super();
    }

    static fromJson(dadosJson: Grupos) {
        return Object.assign(new Grupos, dadosJson);
    }
}