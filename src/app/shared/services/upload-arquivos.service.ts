import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { EmitirAlerta } from '../helpers/sweet-alertas';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/arquivo/file-upload.model';
import { HelperUpload } from '../helpers/helper-upload';
import { UploadStatus } from '../enums/upload.enum';

@Injectable({
  providedIn: 'root'
})
export class UploadArquivosService {

  private _estaEnviando: boolean;
  private _enviandoAtualmente: BehaviorSubject<boolean>;
  private _arquivos: FileUpload[] = [];
  private _uploadDaFila: BehaviorSubject<FileUpload[]>;

  public request: Subscription;

  constructor(private http: HttpClient) {
    this._estaEnviando = false;
    this._enviandoAtualmente = new BehaviorSubject<boolean>(this._estaEnviando);
    this._uploadDaFila = new BehaviorSubject([]);
  }

  public get obterFilaDeArquivos() {
    return this._uploadDaFila.asObservable();
  }

  public get obterQuantidadeArquivos() {
    return this._arquivos.length;
  }

  private set estaEnviando(value: boolean) {
    this._estaEnviando = value;
    this._enviandoAtualmente.next(value);
  }

  public adicionarArquivoNaFila(file: File) {

    const limiteMB = 50 * (1024 * 1024); // 50mb = 52428800

    if (this._arquivos.length >= 5) return;

    const filaUploadFile = new FileUpload(HelperUpload.gerarArquivoNomeHash(file));
    filaUploadFile.lastName = file.name;
    filaUploadFile.setarMensagemDeAcordoComStatus(UploadStatus.NaFila)
    this._arquivos.push(filaUploadFile);
    this._uploadDaFila.next(this._arquivos);
    console.log(filaUploadFile);

    if (file.size > limiteMB) {
      filaUploadFile.falhou("Anexo excedeu o tamanho permitido");
      return;
    }

    this.verificarECarregarOProximoArquivo();
  }

  private verificarECarregarOProximoArquivo() {
    if (this._estaEnviando) return;

    let primeiraOpcao = this._arquivos.find((file: FileUpload) => file.esperandoParaCarregar);
    if (primeiraOpcao)
      this.upload(primeiraOpcao);
  }

  public cancelarRequisicao() {
    console.log(this.request)
    if (this.request != undefined)
      this.request.unsubscribe();
  }

  public criarRequest(arquivoNaFila: FileUpload) {
    const formData = new FormData();
    formData.append('arquivo', arquivoNaFila.file, arquivoNaFila.file.name);
    return this.http.post(`${environment.BASE_URL}api/upload-arquivos/`, formData, {
      observe: 'events',
      reportProgress: true,
      responseType: 'json'
    })
  }

  private upload(arquivoNaFila: FileUpload) {
    this.estaEnviando = true;
    arquivoNaFila.setarMensagemDeAcordoComStatus(UploadStatus.Enviando);

    this.request = this.criarRequest(arquivoNaFila)
      .pipe(
        finalize(() => {
          // Upload concluído. Não importa se foi bem-sucedido ou não.
          this.estaEnviando = false;
          this.verificarECarregarOProximoArquivo();
        })
      ).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const porcentagem = Math.round(100 * event.loaded / event.total);
            arquivoNaFila.atualizaProgresso(porcentagem);
          } else if (event instanceof HttpResponse) {
            arquivoNaFila.completado();
          }
          this._uploadDaFila.next(this._arquivos);
        },
        error: (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // Ocorreu um erro no lado do cliente ou na rede. Manuseie-o adequadamente.
            arquivoNaFila.falhou();
            console.log("erro");
          } else {
            // O back-end retornou um código de resposta malsucedido.
            arquivoNaFila.falhou();
            console.log("erro");
          }
          this._uploadDaFila.next(this._arquivos);
        },
        complete: () => {
          console.info("Completado!");
        }
      })
  }

  salvarArquivo(arquivo: File) {
    let formData = new FormData();
    formData.append("Arquivo", arquivo);
    return this.http.post<any>(`${environment.BASE_URL}api/upload-arquivos`, formData)
      .subscribe({
        next: (data) => {
          console.log('upload (salvarArquivo): ', data);
          if (!data) return EmitirAlerta.AlertaToastError("Algo deu errado, tente novamente");
        },
        error: () => {
          EmitirAlerta.AlertaToastError("Não foi possível gravar, verifique sua conexão");
        }
      })
  }

  atualizarArquivo(caminhoAntigo: string, arquivo: File) {
    console.log("aualizarArquivo");
    let formData = new FormData();
    formData.append("Arquivo", arquivo);
    formData.append("CaminhoImagem", caminhoAntigo);
    return this.http.put<any>(`${environment.BASE_URL}api/upload-arquivos`, formData)
      .subscribe({
        next: (data) => {
          if (!data) return EmitirAlerta.AlertaToastError("Algo deu errado, tente novamente");
        },
        error: () => {
          EmitirAlerta.AlertaToastError("Não foi possível gravar, verifique sua conexão");
        }
      })
  }

  excluirSomenteUmArquivo(caminhoAntigo: string) {
    return this.http.delete<any>(`${environment.BASE_URL}api/UploadArquivos?caminhoImagem=${caminhoAntigo}`)
  }

  async excluirListaDeArquivos(caminhoAntigo: string[]) {
    return await this.http.post<any>(`${environment.BASE_URL}api/UploadArquivos/DeleteImagens`, caminhoAntigo)
      .subscribe({
        next: (data) => {
          if (!data) return EmitirAlerta.AlertaToastError("Algo deu errado, tente novamente");
        },
        error: () => {
          EmitirAlerta.AlertaToastError("Não foi possível gravar, verifique sua conexão");
        }
      })
  }

}
