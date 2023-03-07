export class Endereco {
    constructor(
        public logradouro?: string,
        public bairro?: string,
        public numero?: string,
        public complemento?: string,
        public uf?: string,
        public cidade?: string,
        public cep?: string,
    ) { }
}