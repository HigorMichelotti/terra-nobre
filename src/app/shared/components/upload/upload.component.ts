import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadStatus } from '../../enums/upload.enum';
import { EmitirAlerta } from '../../helpers/sweet-alertas';
import { UploadArquivosService } from '../../services/upload-arquivos.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  public files: any[] = [];

  public imagem: File;
  public caminhoUpload: string = environment.CAMINHO_IMAGEM;

  constructor(
    private uploadService: UploadArquivosService
  ) { }

  ngOnInit(): void {
  }

  public carregarImagem(file: any) {
    console.log(file);

    const imagem = file[0];
    if (imagem) {
      const reader = new FileReader()
      reader.readAsDataURL(imagem);
      this.imagem = imagem;
    }
  }

  soltarArquivo($event: any) {
    this.prepararListaDeArquivos($event);
  }

  procurarArquivo(files: Array<any>) {
    this.prepararListaDeArquivos(files);
  }

  deletarArquivo(index: number) {
    console.log(this.files[index].progress)
    const file = this.files[index];
    console.log(file);

    if (file.status == UploadStatus.Enviando && file.progress > 0) {
      console.log("Upload em progresso.");
      this.uploadService.cancelarRequisicao();
    }

    if (file.status == UploadStatus.Finalizado) {
      this.uploadService.excluirSomenteUmArquivo(this.files[index].name).subscribe({
        next: (value) => {
          console.log(value);
          if (!value) this.acaoQuandoForError();
          this.files.splice(index, 1);
          this.acaoQuandoForSucesso();
        },
        error: () => {
          this.acaoQuandoForError()
        }
      })
    }

    this.files.splice(index, 1);
  }

  prepararListaDeArquivos(files: Array<any>) {
    for (const item of files) {
      this.uploadService.adicionarArquivoNaFila(item)
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadService.obterFilaDeArquivos.subscribe(value => this.files = value)
  }


  protected acaoQuandoForSucesso(mensagem?: string): any {
    if (mensagem) return EmitirAlerta.AlertaToastSuccess(mensagem);
    return EmitirAlerta.AlertaToastSuccess("Solicitação processada com sucesso!")
  }

  protected acaoQuandoForError(mensagem?: string): any {
    if (mensagem) return EmitirAlerta.AlertaToastError(mensagem);
    return EmitirAlerta.AlertaToastError("Ocorreu um erro ao processar a sua solicitação!")
  }

}
