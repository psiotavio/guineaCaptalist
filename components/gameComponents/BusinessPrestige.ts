import { Business } from "./Business";
import BusinessManager from "./BusinessManager";

export class BusinessPrestige {
  public id: number;
  public nome: string;
  public valor: number;
  public imagem: string;
  public businessAlvo: Business | null;
  public desbloqueado: boolean;

  constructor(
    id: number,
    nome: string,
    valor: number,
    imagem: string,
    businessAlvo: Business,
    desbloqueado: boolean
  ) {
    this.id = id;
    this.nome = nome;
    this.valor = valor;
    this.imagem = imagem;
    this.businessAlvo = businessAlvo;
    this.desbloqueado = desbloqueado;
  }

  // Getters e setters para id
  getId(): number {
    return this.id;
  }

  setId(value: number) {
    this.id = value;
  }

  // Getters e setters para nome
  getNome(): string {
    return this.nome;
  }

  setNome(value: string) {
    this.nome = value;
  }

  // Getters e setters para valor
  getValor(): number {
    return this.valor;
  }

  setValor(value: number) {
    this.valor = value;
  }

  // Getters e setters para imagem
  getImagem(): string {
    return this.imagem;
  }

  setImagem(value: string) {
    this.imagem = value;
  }

  // Getters e setters para businessAlvo
  getBusinessAlvo(): Business | null {
    return this.businessAlvo;
  }

  setBusinessAlvoAuto(): void{
    BusinessManager.setAuto(this.businessAlvo!.nome!);
    BusinessManager.salvarNegocios();
  }

  setBusinessAlvo(value: Business | null) {
    this.businessAlvo = value;
  }

  // Getters e setters para desbloqueado
  getDesbloqueado(): boolean {
    return this.desbloqueado;
  }

  setDesbloqueado(value: boolean) {
    this.desbloqueado = value;
  }

  // Método para alterar o estado do booleano 'automatic' do negócio associado
  alterarAutomatico(automatico: boolean): void {
    if (this.businessAlvo) {
      this.businessAlvo.setAutomatic(automatico);
    } else {
      console.error("O negócio associado não foi definido.");
    }
  }
}
