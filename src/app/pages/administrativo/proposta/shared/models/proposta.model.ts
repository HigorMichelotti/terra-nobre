import { Comprador } from "./comprador.model";
import { Imovel } from "./Imodel.model";
import { Valores } from "./valores.model";

export class Proposta {
    constructor(
        public id?: string,
        public imovel?: Imovel,
        public comprador?: Array<Comprador>,
        public valores?: Valores,
    ) { }
}