export class PaginacaoResponse<T> {
    constructor(
        public items?: Array<T>,
        public total?: number,
        public pageSize?: number,
        public pageIndex?: number,
        public totalPages?: number,
    ) {
        this.items = new Array<T>();
        this.total = 0;
        this.pageSize = 0;
        this.pageIndex = 1;
        this.totalPages = 0;
     }

    public adicionarDados(novosDados: PaginacaoResponse<T>) {
        this.pageIndex = novosDados.pageIndex;
        this.pageSize = novosDados.pageSize;
        this.totalPages = novosDados.totalPages;
        this.total = novosDados.total;
        this.items = this.items.concat(novosDados.items);
    }
}
