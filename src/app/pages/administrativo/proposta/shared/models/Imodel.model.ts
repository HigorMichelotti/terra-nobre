export class Imovel {
    constructor(
        public vendedor?: string,
        public corretor?: string,
        public numero?: number,
        public quadra?: string,
        public area?: number,
        public cidade?: string
    ) { }
}