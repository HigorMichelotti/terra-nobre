import { Conjuge } from "./conjuge.model";
import { Endereco } from "./endereco.model";


export class Comprador {
    constructor(
        public rg?: string,
        public nome?: string,
        public orgaoEmissor?: string,
        public cpf?: string,
        public nacionalidade?: string,
        public profissao?: string,
        public telefone?: string,
        public email?: string,
        public sexo?: string,
        public dataExpedicao?: string,
        public dataNascimento?: string,
        public estadoCivil?: string,
        public regimeCasamento?: string,
        public conjuge?: Conjuge,
        public endereco?: Endereco
    ) { }
}