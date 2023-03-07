import Swal from 'sweetalert2';
import { v1 as uuidv1 } from 'uuid';

export class HelperUtils {

  public static capitalizeString(value: any): string {
    var resArray = value.split("-").map((x: any) => `${x.charAt(0).toUpperCase() + x.slice(1)}`);
    var stringFormat = `${resArray.join().replace(/,/g, " ")}`
    console.log(stringFormat);
    console.log(resArray);
    return stringFormat;

  }

  public static pegarExtensaoArquivo(arquivo: File): string {
    return arquivo.name.substring(arquivo.name.lastIndexOf('.') + 1, arquivo.name.length) || arquivo.name;
  }

  public static pegarNomeArquivo(arquivo: string): string | null {
    if (!arquivo) return null;
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

  public static setarNomeThumbnail(arquivo: File): File | any {
    const novoArquivo = new File([arquivo], `thumbnail-${uuidv1()}.${this.pegarExtensaoArquivo(arquivo)}`, { type: arquivo.type });
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

  public static formatCnpjCpf(value: string) {

    if (!value) return value = "-"

    const cnpjCpf = value.replace(/\D/g, '');

    if (cnpjCpf.length === 11) {
      return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
    }

    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
  }

  public static converterValorParaReal(numero: any) {
    if (!numero) return;
    var numero = numero.toFixed(2).split('.');
    numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
  }

  public static validaData(dataValue: string) {
    let data: string[] = dataValue.split("/");
    let dia: number = parseInt(data[0]);
    let mes: number = parseInt(data[1]);
    let ano: number = parseInt(data[2]);
    let anoValidator: number = new Date().getFullYear() + 100;

    if (dia > 31 || dia <= 0) {
      return false;
    }
    else if (mes > 12 || mes <= 0) {
      return false;
    }
    else if (ano < 1970 || ano > anoValidator) {
      return false;
    }
    return true;
  }

  public static formatCurrency(n: any, currency: any) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: currency }).format(n);
  }

  public static obterPrimeiroEUltimoDiaDoMes() {
    var dataAtual = new Date();
    var primeiroDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
    var ultimoDiaDoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0);
    return { primeiroDiaDoMes, ultimoDiaDoMes };
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
