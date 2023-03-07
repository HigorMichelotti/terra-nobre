import { Parcela } from "./parcela.model";

export class Valores {
    constructor(
        public valorContrato?: string,
        public valorEntrada?: string,
        public valorFinanciamento?: string,
        public valorParcelaFinanciamento?: string,
        public primeiroVencimento?: string,
        public quantidadeParcelaFinanciamento?: string,
        public quantidadeParcela?: string,
        public dataVencimentoSinal?: string,
        public parcelas?: Array<Parcela>
    ) { }
}