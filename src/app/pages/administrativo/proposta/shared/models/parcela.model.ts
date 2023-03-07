export class Parcela {
    constructor(
        public id?: number,
        public valor?: number,
        public vencimento?: string,
        public editarParcela?: boolean,
        public valorEditado?: boolean,
    ) { }
}