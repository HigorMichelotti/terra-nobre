export class AlterarSenha {
    constructor(
        public id?: number,
        public senhaAtual?: string,
        public novaSenha?: string,
        public confirmacaoNovaSenha?: string
    ) { }

    static fromJson(dadosJson: any): AlterarSenha {
        return Object.assign(new AlterarSenha(), dadosJson);
    }
}