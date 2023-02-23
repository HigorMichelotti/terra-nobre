import { ModelBase } from "./ModelBase";

export class StatusLancamento extends ModelBase {
  constructor(
    public nome?: string,
  ) {
    super()
  }

  static fromJson(dadosJson: any): StatusLancamento {
    return Object.assign(new StatusLancamento(), dadosJson);
  }

  get aberto() {
    return this.nome == `Aberto`
  }
}
