import { v1 as uuidv1 } from 'uuid';
import Swal from 'sweetalert2';

export class HelperUpload {
    public static pegarExtensaoArquivo(arquivo: File): string {
        return arquivo.name.substring(arquivo.name.lastIndexOf('.') + 1, arquivo.name.length) || arquivo.name;
    }

    public static pegarNomeArquivo(arquivo: string): string {
        if (!arquivo) return null
        return arquivo.substring(arquivo.lastIndexOf('/') + 1, arquivo.length) || arquivo;
    }

    /**
     * Gerar arquivo novo com hash em seu nome
     * @param arquivo - Arquivo a ser redefinido
     * @param retornarAntigoArquivo - Caso seja true, retorna um objeto com antigo arquivo e novo arquivo
     */
    public static gerarArquivoNomeHash(arquivo: File, retornarAntigoArquivo?: boolean): File | any {
        const novoArquivo = new File([arquivo], `${uuidv1()}.${this.pegarExtensaoArquivo(arquivo)}`, { type: arquivo.type });

        if (retornarAntigoArquivo === true) {
            console.log("retornaAntigo");
            return { arquivoAntigo: arquivo, novoArquivo }
        }

        return novoArquivo;
    }

    public static async verificaTamanhoImagem(file: any, tamanhoMaxPermitido: number) {
        let fileSize: any = (Math.round(file.size * tamanhoMaxPermitido / 1024) / tamanhoMaxPermitido);
        if (fileSize > tamanhoMaxPermitido) {
            if ((fileSize > 1024) ?
                fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() + 'MB' :
                fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB')
                await Swal.fire({
                    icon: 'error',
                    title: 'Imagem muito grande',
                    text: `O tamanho da imagem não pode ultrapassar ${tamanhoMaxPermitido}KB.`,
                    footer: `<p class='data-danger'>A imagem escolhida possui: ${fileSize}</p>`
                });
            return false;
        }
        return true;
    }

    /**
     * Formatar bytes de arquivo
     * @param bytes (Tamanho do arquivo em bytes)
     * @param decimals (Ponto decimais)
     */
    public static formatarBytes(bytes: number, decimals: number = 2) {
        if (bytes === 0) {
            return "0 Bytes";
        }
        const k = 1024;
        const dm = decimals <= 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }
}