import { UploadStatus } from '../../enums/upload.enum';
import { HelperUpload } from '../../helpers/helper-upload';

export class FileUpload {
  public name: string;
  public lastName: string;
  public message: string;
  public size: number;
  public status: UploadStatus;
  public progress: number;
  public classCss: string;
  public labelColorCss: string;
  public styleClass?: any;

  constructor(public file: File) {
    this.name = file.name;
    this.lastName = file.name;
    this.size = file.size;
    this.status = UploadStatus.NaFila;
    this.progress = 0;
    this.classCss = "";
    this.labelColorCss = "";
    this.styleClass = {};
  }

  public atualizaProgresso(progress: number) {
    this.progress = progress;
    this.setarMensagemDeAcordoComStatus(UploadStatus.Enviando)
    this.classCss = "progress"
  }

  public completado() {
    this.progress = 100;
    this.setarMensagemDeAcordoComStatus(UploadStatus.Finalizado)
    this.classCss = "progress-finish"
  }

  public falhou(mensagem?: string) {
    this.progress = 0;
    this.setarMensagemDeAcordoComStatus(UploadStatus.Error, mensagem)
    this.styleClass = {
      divFileError: "div-file-error"
    }
    this.labelColorCss = "label-error"
  }

  public setarMensagemDeAcordoComStatus(status: UploadStatus, message?: string): void {
    switch (status) {
      case UploadStatus.NaFila:
        this.status = UploadStatus.NaFila;
        this.message = message || "Na fila";
        break;
      case UploadStatus.Enviando:
        this.status = UploadStatus.Enviando;
        this.message = message || "Aguarde, enviando arquivo.";
        break;
      case UploadStatus.Finalizado:
        this.status = UploadStatus.Finalizado;
        this.message = message || "Upload finalizado!";
        break;
      case UploadStatus.Error:
        this.status = UploadStatus.Error;
        this.message = message || "Não foi possivel realizar o upload do arquivo.";
        break;
      default:
        this.status = UploadStatus.Desconhecido;
        this.message = message || "Status desconhecido";
        break;
    }
  }

  get arquivoUpado() {
    return this.status === UploadStatus.Finalizado;
  }

  get sizeFormatado() {
    return HelperUpload.formatarBytes(this.size)
  }

  get esperandoParaCarregar() {
    return this.status === UploadStatus.NaFila;
  }
}
