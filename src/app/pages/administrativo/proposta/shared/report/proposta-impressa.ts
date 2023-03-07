import * as moment from 'moment';
import 'moment/locale/pt-br';
import { HelperUtils } from 'src/app/shared/helpers/helper-utils';
import { LOGO_TERRANOBRE_BASE64 } from 'src/app/shared/helpers/helpers-proposta';
import { PropostaImpressaService } from 'src/app/shared/services/proposta-impressa.service';
import { Comprador } from '../models/comprador.model';
import { Parcela } from '../models/parcela.model';
import { Proposta } from '../models/proposta.model';
moment.locale('pt-BR');

export class PropostaImpressa {

    constructor(
        public dadosProposta: Proposta,
        public propostaImpressaService: PropostaImpressaService
    ) { }

    gerarRelatorio() {

        const dadosTabelaChamados = this.dadosProposta.comprador.map((comprador: Comprador, indexComprador: number) => {
            // comprador = Comprador.fromJson(chamado);

            const headerChamado = [
                { text: `Nome: ${comprador.nome}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 10, 0, 2] },
                { text: `Sexo: ${comprador.sexo}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'right' },
                { text: `RG: ${comprador.rg}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 2] },
                { text: `Orgão emissor: ${comprador.orgaoEmissor}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'center' },
                { text: `Data expedição: ${comprador.dataExpedicao}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'right' },
                { text: `CPF: ${comprador.cpf}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 2] },
                { text: `Regime de casamento: ${comprador.regimeCasamento}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'center' },
                { text: `Data de nascimento: ${comprador.dataNascimento}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'right' },
                { text: `Nacionalidade: ${comprador.nacionalidade}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 2] },
                { text: `Estado civil: ${comprador.nacionalidade}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'right' },
                { text: `Profissão: ${comprador.profissao}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 6] },
                { text: `Telefone: ${comprador.telefone}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 6] },
                { text: `Email: ${comprador.email}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 6] },

                { text: `Endereço: ${comprador.endereco.logradouro}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 10, 0, 2] },
                { text: `Nº: ${comprador.endereco.numero}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'center' },
                { text: `Complemento: ${comprador.endereco.complemento}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -13, 0, 2], alignment: 'right' },
                { text: `Bairro: ${comprador.endereco.bairro}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 2] },
                { text: `UF: ${comprador.endereco.uf}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'right' },
                { text: `Cidade: ${comprador.endereco.cidade}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, 0, 0, 2] },
                { text: `CEP: ${comprador.endereco.cep}`, fontSize: 9, style: 'header', color: '#2f2f2f', margin: [-10, -10, 0, 2], alignment: 'right' },
                { canvas: [{ type: 'line', x1: -10, y1: 15, x2: 595 - 2 * 40, y2: 15, lineWidth: 1, color: '#a7aeaf' }] },
            ]

            return [headerChamado]
        });

        // const headerEspaco = [
        //     { text: "", fontSize: 9, style: 'header', bold: true, margin: [0, 15, 0, 2] },
        // ]

        // const headersTabelaTotais = [
        //     { text: 'Tipo', fontSize: 10, bold: true, alignment: 'center' },
        //     { text: 'Total Minutos', fontSize: 10, bold: true, alignment: 'center' },
        //     { text: 'Total Valor', fontSize: 10, bold: true, alignment: 'center' },
        // ];

        // if (this.dadosRelatorio.chamados.length > 0)
        //     var dadosTabelaTotais = [headerEspaco, this.tabelaTotais(headersTabelaTotais)]

        // else if (this.dadosRelatorio.chamados.length <= 0)
        //     var mensagemSemDados = [{ text: "Informações não encontradas", fontSize: 25, alignment: 'center', italics: true, color: '#a7aeaf', margin: [0, 70, 0, 2] }]


        const relatorio = {
            pageSize: 'A4',
            pageOrientation: 'Portrait',
            pageMargins: [40, 80, 40, 60],
            header: {
                columns: [
                    [
                        { image: 'logoDbSo', width: '80', margin: [30, 20, 30, 0] },
                    ],
                ]
            },
            content: [
                this.cabecalhoRelatorio(),
                { canvas: [{ type: 'line', x1: -10, y1: 60, x2: 595 - 2 * 40, y2: 60, lineWidth: 1, color: '#a7aeaf' }] },
                this.dadosImobiliaria(),
                { canvas: [{ type: 'line', x1: -10, y1: 13, x2: 595 - 2 * 40, y2: 13, lineWidth: 1, color: '#a7aeaf' }] },
                { text: `Compradores`, fontSize: 12, color: '#004936', bold: true, margin: [-10, 10, 0, 0], alignment: 'left' },
                dadosTabelaChamados,
                this.dadosFinanciamento(),
                { canvas: [{ type: 'line', x1: -10, y1: 13, x2: 595 - 2 * 40, y2: 13, lineWidth: 1, color: '#a7aeaf' }] },
                this.dadosEntrada(),
                this.tabelaParcelas(),
                this.assinaturas(),
            ],
            footer: function (currentPage: number, pageCount: number, pageSize: number) {
                return [
                    { text: `Página ${currentPage.toString()}` + ' de ' + pageCount, alignment: 'right', color: '#a7aeaf', fontSize: 9, margin: [0, 20, 40, 0] },
                ]
            },
            images: {
                logoDbSo: LOGO_TERRANOBRE_BASE64
            }
        }

        this.propostaImpressaService.gerarRelatorio(relatorio);
    }

    assinaturas() {
        let linhas: any[] = [];

        [{}, {}, {}].forEach((element, index) => {
            if (index == 0) {
                linhas.push(
                    { canvas: [{ type: 'line', x1: 0, y1: 50, x2: 150, y2: 50, lineWidth: 1, color: '#a7aeaf' }] },
                    { text: `Comprador 1`, fontSize: 8, style: 'header', color: '#2f2f2f', margin: [50, 2, 0, 2] },
                )
            }
            if (index == 1) {
                linhas.push(
                    { canvas: [{ type: 'line', x1: 200, y1: 50, x2: 350, y2: 50, lineWidth: 1, color: '#a7aeaf' }] },
                    { text: `Comprador 2`, fontSize: 8, style: 'header', color: '#2f2f2f', margin: [350, 2, 0, 2] },
                )
            }

        });

        return linhas
    }

    cabecalhoRelatorio() {
        let cabecalhoFinanceiroPorColaborador: any = [];
        cabecalhoFinanceiroPorColaborador = [
            { text: `PROPOSTA DE COMPRA`, fontSize: 18, color: '#004936', bold: true, margin: [0, -30, 0, 15], alignment: 'center' }, //#2f2f2f
            { text: `Emissão: ${moment().format('DD/MM/YYYY HH:MM')}`, italics: true, color: '#a7aeaf', fontSize: 9, margin: [110, -60, 0, 0], alignment: 'right' },
            { text: `Corretor: ${this.dadosProposta.imovel.corretor}`, italics: true, color: '#a7aeaf', fontSize: 9, alignment: 'right' },
        ]
        return cabecalhoFinanceiroPorColaborador;
    }

    dadosImobiliaria() {
        let cabecalhoFinanceiroPorColaborador: any = [];

        cabecalhoFinanceiroPorColaborador = [
            { text: `Vendedor: ${this.dadosProposta.imovel.vendedor}`, color: '#2f2f2f', fontSize: 9, margin: [-10, 10, 0, 0], alignment: 'left' },
            { text: `Cidade: ${this.dadosProposta.imovel.cidade}`, color: '#2f2f2f', fontSize: 9, margin: [-10, -10, 0, 0], alignment: 'center' },
            { text: `Numero: ${this.dadosProposta.imovel.numero}`, color: '#2f2f2f', fontSize: 9, margin: [-10, -10, 0, 0], alignment: 'right' },
            { text: `Quadra: ${this.dadosProposta.imovel.quadra}`, color: '#2f2f2f', fontSize: 9, margin: [-10, 0, 0, 0], alignment: 'left' },
            { text: `Área: ${this.dadosProposta.imovel.area}`, color: '#2f2f2f', fontSize: 9, margin: [-10, -10, 0, 0], alignment: 'right' },
        ]

        return cabecalhoFinanceiroPorColaborador;
    }

    dadosFinanciamento() {
        return [
            { text: `VALOR DA UNIDADE: `, fontSize: 12, color: '#2f2f2f', margin: [-10, 10, 0, 0], alignment: 'left' },
            { text: HelperUtils.converterValorParaReal(Number(this.dadosProposta.valores.valorContrato)), fontSize: 12, color: '#2f2f2f', bold: true, margin: [110, -14, 0, 0] },
            { text: `VALOR DO FINANCIAMENTO: `, fontSize: 12, color: '#2f2f2f', margin: [-10, -14, 80, 0], alignment: 'right' },
            { text: HelperUtils.converterValorParaReal(Number(this.dadosProposta.valores.valorFinanciamento)), fontSize: 12, color: '#2f2f2f', bold: true, margin: [0, -14, 0, 0], alignment: 'right' },
            { text: `Quantidade de parcelas: ${this.dadosProposta.valores.quantidadeParcelaFinanciamento}`, fontSize: 9, color: '#2f2f2f', margin: [-10, 10, 0, 0], alignment: 'left' },
            { text: `1º vencimento: ${this.dadosProposta.valores.primeiroVencimento}`, fontSize: 9, color: '#2f2f2f', margin: [-10, -10, 0, 0], alignment: 'center' },
            { text: `Valor parcelas: ${HelperUtils.converterValorParaReal(Number(this.dadosProposta.valores.valorParcelaFinanciamento))}`, fontSize: 9, color: '#2f2f2f', margin: [-10, -10, 0, 0], alignment: 'right' },
        ]
    }

    dadosEntrada() {
        return [
            { text: `Valor da entrada: `, fontSize: 9, color: '#2f2f2f', margin: [-10, 10, 0, 0], alignment: 'left' },
            { text: HelperUtils.converterValorParaReal(Number(this.dadosProposta.valores.valorEntrada)), fontSize: 9, color: '#2f2f2f', bold: true, margin: [60, -10, 0, 0] },
        ]
    }

    // tabela(headerValor: any, headers: any, indexChamadosApontamentos: number) {
    //     return {
    //         table: {
    //             widths: [80, '*', '*', '*'],
    //             headerRows: 1,
    //             body: this.corpoDaTabela(headerValor, headers, indexChamadosApontamentos)
    //         },
    //         layout: {
    //             fillColor: function (rowIndex: number, node: any, columnIndex: number) {
    //                 return (rowIndex % 2 === 0) ? '#F1F1F1' : null;
    //             }
    //         }
    //     };
    // }

    tabelaParcelas() {
        const headers = [
            { text: 'Numero', fontSize: 10, bold: true, alignment: 'center' },
            { text: 'Valor', fontSize: 10, bold: true, alignment: 'center' },
            { text: 'Vencimento', fontSize: 10, bold: true, alignment: 'center' },
        ];
        return {
            margin: [-10, 10, 0, 0],
            table: {
                widths: [50, '*', '*'],
                headerRows: 1,
                body: this.corpoDaTabelaTotais(headers)
            },
            layout: {
                hLineWidth: function (i: any, node: any) {
                    if (i === 0 || i === node.table.body.length) return 1;
                    return 0;
                },
                vLineWidth: function (i: any, node: any, columnIndex: number) {
                    if (i === 0 || i === 3) return 1
                    return 0
                },
                fillColor: function (rowIndex: number, node: any, columnIndex: number) {
                    return (rowIndex % 2 === 0) ? '#fcfcfc' : null;
                },
                hLineColor: function (i: any, node: any) { return '#e5e5e5' },
                vLineColor: function (i: any, node: any) { return '#e5e5e5' },
                paddingLeft: function (i: any, node: any) { return 10 },
                paddingRight: function (i: any, node: any) { return 10; },
                paddingTop: function (i: any, node: any) { return 5 },
                paddingBottom: function (i: any, node: any) { return 5 },
            }
        };
    }

    corpoDaTabelaTotais(headers: any) {
        let bodyTotais = [];
        bodyTotais.push(headers);

        this.dadosProposta.valores.parcelas.forEach((parcela: Parcela) => {
            let arrayTotais = [
                { text: parcela.id + 1, fontSize: 9, alignment: 'center' },
                { text: HelperUtils.converterValorParaReal(Number(parcela.valor)), fontSize: 9, alignment: 'center' },
                { text: parcela.vencimento, fontSize: 9, alignment: 'center' }
            ]
            bodyTotais.push(arrayTotais)
        })

        return bodyTotais;
    }

    // corpoDaTabela(headerValor: any, headers: any, index: number) {
    //     let body = [];
    //     body.push(headerValor);
    //     body.push(headers);

    //     let somaMinutosChamados = 0;
    //     var chamadoRelatorio = Chamado.fromJson(this.dadosRelatorio.chamados[index]);
    //     chamadoRelatorio.cronologias.forEach((cronologia: Cronologias) => {
    //         let arrayCronologia = [
    //             { text: cronologia.minutos, fontSize: 9, alignment: 'center' },
    //             // { text: cronologia.statusEnumString, fontSize: 9, alignment: 'center' },
    //             { text: cronologia.dataHoraOperacaoFormatada, fontSize: 9, alignment: 'center' },
    //             { text: cronologia.responsavel.nome, fontSize: 9, alignment: 'center' }
    //         ]
    //         body.push(arrayCronologia)
    //     })

    //     somaMinutosChamados = (somaMinutosChamados + chamadoRelatorio.totalMinutos)

    //     const totalMinutosChamados: any = [
    //         { text: somaMinutosChamados, fontSize: 10, bold: true, alignment: 'center' },
    //         {}, {}, {}
    //     ]
    //     body.push(totalMinutosChamados);

    //     return body;
    // }
}
