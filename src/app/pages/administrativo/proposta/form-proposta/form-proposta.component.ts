import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { NgxViacepService } from '@brunoc/ngx-viacep';
import { first } from 'rxjs';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form/base-form.component';
import { Status } from 'src/app/shared/enums/status.enum';
import { NavigationBreadcrumbItem } from 'src/app/shared/interfaces/navigation-breadcrumb';
import { EnderecoViaCep } from 'src/app/shared/models/endereco-via-cep.model';
import { Roles } from 'src/app/shared/models/usuario/roles.model';
import Swal from 'sweetalert2';
import { Usuario } from '../../usuarios/shared/models/usuario.model';
import { UsuarioService } from '../../usuarios/shared/usuario.service';

@Component({
  selector: 'app-form-proposta',
  templateUrl: './form-proposta.component.html',
  styleUrls: ['./form-proposta.component.scss']
})
export class FormPropostaComponent extends BaseFormComponent<Usuario> implements OnInit {

  override formulario = this.formBuilder.group({
    id: [null],
    imovel: this.formBuilder.group({
      vendedor: [],
      numero: [],
      quadra: [],
      area: [],
      cidade: [],
      metragem: []
    }),
    comprador: this.formBuilder.group({
      rg: [],
      nome: [],
      orgaoEmissor: [],
      cpf: [],
      nacionalidade: [],
      profissao: [],
      telefone: [],
      email: [],
      sexo: [],
      dataExpedicao: [],
      dataNascimento: [],
      estadoCivil: [],
      regimeCasamento: [],
      conjuge: this.formBuilder.group({
        nome: [],
        profissao: [],
        rg: [],
        cpf: [],
        dataNascimento: [],
        email: []
      }),
      endereco: this.formBuilder.group({
        logradouro: [],
        bairro: [],
        numero: [],
        complemento: [],
        uf: [],
        cidade: [],
        cep: []
      })
    }),
    valores: this.formBuilder.group({
      valorContrato: [],
      valorEntrada: [],
      valorFinanciamento: [],
      valorParcelaFinanciamento: [],
      primeiroVencimento: [],
      quantidadeParcelaFinanciamento: [],
      quantidadeParcela: [],
      dataVencimentoSinal: []
    })
  })

  formularioParcela = this.formBuilder.group({
    vencimento: new FormArray([new FormControl<string>(null)]),
    valor: new FormArray([new FormControl<string>(null)]),
  })

  public arrayCidades: Array<any>;
  public arrayNacionalidade: Array<any>;
  public arraySexo: Array<any>;
  public arrayEstadoCivil: Array<any>;
  public arrayRegimeCasamento: Array<any>;
  public arrayParcelas: Array<any>;
  public mensagemErroViaCep: string;

  public atualizandoComprador: boolean = false;
  public indexCompradorAtualizando: number;

  public arrayCompradores: Array<any>;

  constructor(
    protected override injector: Injector,
    private usuarioService: UsuarioService,
    private viacepService: NgxViacepService
  ) {
    super(injector, usuarioService, Usuario.fromJson)
  }

  override ngOnInit() {
    super.ngOnInit();

    this.arrayCidades = [{ nome: 'Santa Fé do Sul' }, { nome: 'Três Fronteiras' }, { nome: 'Santa Rita do Oeste' }, { nome: 'Rubinéia' }, { nome: 'Aparecida do taboado' }]
    this.arrayNacionalidade = [{ descricao: 'Brasileiro' }]
    this.arraySexo = [{ descricao: 'Masculino' }, { descricao: 'Feminino' }]
    this.arrayEstadoCivil = [{ descricao: 'Casado(a)' }, { descricao: 'Solteiro(a)' }, { descricao: 'Viúvo(a)' }, { descricao: 'Divorciado(a)' }]
    this.arrayRegimeCasamento = [{ descricao: 'CPB' }, { descricao: 'CTB' }]
    this.arrayCompradores = []
    this.arrayParcelas = []
  }

  gerarParcelas() {
    this.arrayParcelas = [];
    let vencimentoSugerido = this.formulario.value.valores.dataVencimentoSinal

    let ano: any = vencimentoSugerido.substring(6, 10);
    let mes: any = vencimentoSugerido.substring(3, 5);
    let dia: any = vencimentoSugerido.substring(0, 2);

    if (dia == '29' && this.anoBissexto(ano)) dia = '28';

    var dataParcela: string;
    var novoMes = 0, novoAno = 0, novoDia = 0;
    let quantidadeParcelas = Number(this.formulario.value.valores.quantidadeParcela);

    let valorParcela: string;

    for (let contador = 0; contador < quantidadeParcelas; contador++) {
      novoMes = (Number(mes) + contador) % 12;
      novoMes = novoMes == 0 ? 12 : novoMes;
      novoAno = Number(ano) + (((Number(mes) + contador) - novoMes) / 12);

      let quantidadeDiasMes = this.retornaQuantidadeDiasMes(novoMes, novoAno);

      if (quantidadeDiasMes < this.retornaQuantidadeDiasMes(mes, ano) && dia > this.retornaQuantidadeDiasMes(novoMes, novoAno)) {
        novoDia = this.retornaQuantidadeDiasMes(novoMes, novoAno);
      }
      else {
        novoDia = dia;
      }

      valorParcela = (Number(this.formulario.value.valores.valorEntrada) / quantidadeParcelas).toFixed(2);

      dataParcela = novoDia.toString() + '/' + this.correcaoMes(novoMes.toString()) + '/' + novoAno.toString();

      this.arrayParcelas.push({
        id: contador, valor: valorParcela, vencimento: dataParcela,
      })
    }

    this.setarAtributosFormularioParcela()
  }

  private anoBissexto(year: any) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  private retornaQuantidadeDiasMes(mes: number, ano: number) {
    let data = new Date(ano, mes, 0);
    return data.getDate();
  }

  private correcaoMes(mes: any) {
    if (isNaN(mes)) return false;
    return mes < 10 ? "0" + mes : mes;
  }

  gerarProposta() { }

  adicionarComprador() {
    this.arrayCompradores.push(this.formulario.value.comprador)
    this.formulario.reset()
  }

  atualizarComprador() {
    this.arrayCompradores[this.indexCompradorAtualizando] = this.formulario.value.comprador;
    this.atualizandoComprador = false;
    this.formulario.reset()
  }

  cancelarEdicaoComprador() {
    this.atualizandoComprador = false;
    this.formulario.reset()
  }

  atribuirParaEditarComprador(comprador: any, indexComprador: number) {
    this.atualizandoComprador = true;
    this.indexCompradorAtualizando = indexComprador;
    this.formulario.controls.comprador.patchValue(comprador)
  }

  atribuirParaEditarParcela(indexParcela: number) {
    this.arrayParcelas[indexParcela].editarParcela = true;
  }

  public finalizarEdicaoParcela(indexParcela: number) {
    this.arrayParcelas[indexParcela].valor = this.formularioParcela.value.valor[indexParcela];
    this.arrayParcelas[indexParcela].vencimento = this.formularioParcela.value.vencimento[indexParcela];
    this.arrayParcelas[indexParcela].valorEditado = true;

    this.calcularValorParcelasRestantes()
    this.arrayParcelas[indexParcela].editarParcela = false;
  }

  calcularValorParcelasRestantes() {
    let quantidadeParcelas = Number(this.formulario.value.valores.quantidadeParcela);

    var valorParcelasEditadas: number = 0
    var quantidadeParcelasSemEditadas: number = 0
    this.arrayParcelas.forEach(parcela => {
      if (parcela.valorEditado) {
        quantidadeParcelasSemEditadas++
        valorParcelasEditadas += parcela.valor
      }
    })

    console.log('valorParcela', valorParcelasEditadas)

    for (let contador = 0; contador < quantidadeParcelas; contador++) {
      if (!this.arrayParcelas[contador].valorEditado) {
        let valorParcela = ((Number(this.formulario.value.valores.valorEntrada) - valorParcelasEditadas) / (quantidadeParcelas - quantidadeParcelasSemEditadas)).toFixed(2);

        this.arrayParcelas[contador].valor = valorParcela;
      }
    }
    console.log('arrayParcelas', this.arrayParcelas)

    // this.setarAtributosFormularioParcela();
  }

  protected setarAtributosFormularioParcela() {
    this.formularioParcela = this.formBuilder.group({
      vencimento: new FormArray(this.arrayParcelas.map(data => new FormControl(data.vencimento))),
      valor: new FormArray(this.arrayParcelas.map(data => new FormControl(data.valor))),
    })

    console.log('this.formularioParcela', this.formularioParcela.value)
  }

  excluirComprador(index: number) {
    Swal.fire({
      title: 'Excluir',
      text: "Realmente deseja excluir?",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value)
        this.arrayCompradores = this.arrayCompradores.filter(x => x.nome != this.arrayCompradores[index].nome)

      console.log('excluir', this.arrayCompradores.filter(x => x.nome != this.arrayCompradores[index].nome))
    })
  }

  protected override atribuirParaEditar(dados: Usuario): void {
    super.atribuirParaEditar(dados);
    this.resource.pipe(first())
      .subscribe((usuario: Usuario) => {
        this.formulario.patchValue(usuario)
      })
  }

  public buscarCep() {
    this.mensagemErroViaCep = "";
    console.log('buscarCep')
    this.viacepService.buscarPorCep(this.formulario.value.comprador.endereco.cep)
      .subscribe({
        next: (endereco: EnderecoViaCep) => {
          this.atribuirEndereco(endereco);
        },
        error: (error) => {
          var mensagemLower = error.message.toLocaleLowerCase().split("_").join(" ");
          this.mensagemErroViaCep = mensagemLower.charAt(0).toUpperCase() + mensagemLower.slice(1)
          this.limparEndereco();
        }
      })
  }

  atribuirEndereco(endereco: EnderecoViaCep) {
    this.formulario.patchValue({
      comprador: {
        endereco: {
          cidade: endereco.localidade,
          uf: endereco.uf,
        }
      }
    });
  }

  limparEndereco() {
    this.formulario.patchValue({
      comprador: {
        endereco: {
          cidade: '',
          uf: '',
        }
      }
    });
  }

  calcularValorFinanciamento() {
    let valorFinanciamento = Number(this.formulario.value.valores.valorContrato) - Number(this.formulario.value.valores.valorEntrada)
    this.formulario.controls.valores.patchValue({
      valorFinanciamento: valorFinanciamento,
      valorParcelaFinanciamento: valorFinanciamento / this.formulario.value.valores.quantidadeParcelaFinanciamento
    })
  }

  public setarBreadcrumb(): NavigationBreadcrumbItem[] {
    return [
      { texto: 'Propostas' },
      { texto: `${this.tituloPagina} propostas` }
    ]
  }
}