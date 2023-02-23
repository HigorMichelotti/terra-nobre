import { ModelBase } from "./ModelBase";
import { StatusLancamento } from "./StatusLancamento";

export class ReferenciaRubrica extends ModelBase {
  constructor(
    public nome?: string,
  ) {
    super()
  }

  static fromJson(dadosJson: any): ReferenciaRubrica {
    return Object.assign(new ReferenciaRubrica(), dadosJson);
  }

}
