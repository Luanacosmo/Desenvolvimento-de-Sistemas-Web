import { Endereco } from "./endereco";
import { Telefone } from "./telefone";

export class Cliente {
    private _nome: string;
    private _cpf: number;
    private _data_nascimento: number;
    private _sexo: string;
    private _endereco: Endereco;
    private _telefones: Telefone[];

    constructor(
        nome: string,
        cpf: number,
        data_nascimento: number,
        sexo: string,
        endereco: Endereco,
        telefones: Telefone[]
    ) {
        this._nome = nome;
        this._cpf = cpf;
        this._data_nascimento = data_nascimento;
        this._sexo = sexo;
        this._endereco = endereco;
        this._telefones = telefones;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(nome: string) {
        this._nome = nome;
    }

    get endereco(): Endereco {
        return this._endereco;
    }

    set endereco(endereco: Endereco) {
        this._endereco = endereco;
    }
}