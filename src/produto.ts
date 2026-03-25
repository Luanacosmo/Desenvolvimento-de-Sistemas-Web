export class Produto {
    private _codigo: number;
    private _descricao: string;
    private _valor: number;

    constructor(codigo: number, descricao: string, valor: number) {
        this._codigo = codigo;
        this._descricao = descricao;
        this._valor = valor;
    }

    get codigo(): number {
        return this._codigo;
    }

    set codigo(codigo: number) {
        this._codigo = codigo;
    }

    get descricao(): string {
        return this._descricao;
    }

    set descricao(descricao: string) {
        this._descricao = descricao;
    }

    get valor(): number {
        return this._valor;
    }

    set valor(valor: number) {
        this._valor = valor;
    }
}