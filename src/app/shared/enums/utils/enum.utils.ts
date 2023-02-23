import { SimNao } from "../sim-nao.enum"
import { Status } from "../status.enum"

export class EnumUtils {
    public static arraySimNao(): any[] {
        return Object.keys(SimNao).map((k: any) => {
            return { descricao: k, valor: k == "Sim" ? true : false }
        })
    }
    public static arrayStatus(): any[] {
        return Object.keys(Status).map((k: any) => {
            return { descricao: k, valor: k == Status.Ativo ? true : false }
        })
    }
}
