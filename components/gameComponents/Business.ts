export class Business {
  public nome: string;
  public custo: number;
  public lucro: number;
  public nivelEficiencia: number;
  public tempoProducao: number;
  public imagem: string;
  public quantidade: number; 
  public desbloqueado: boolean; 

  constructor(
    nome: string,
    custo: number,
    lucro: number,
    nivelEficiencia: number,
    tempoProducao: number,
    imagem: string,
    quantidade: number, 
    desbloqueado: boolean,
  ) {
    this.nome = nome;
    this.custo = custo;
    this.lucro = lucro;
    this.nivelEficiencia = nivelEficiencia;
    this.tempoProducao = tempoProducao;
    this.imagem = imagem;
    this.quantidade = quantidade; // Inicializando a quantidade
    this.desbloqueado = desbloqueado; // Inicializando o status de desbloqueio
  }

  // Métodos getter e setter para o status de desbloqueio
  getDesbloqueado(): boolean {
    return this.desbloqueado;
  }

  setDesbloqueado(desbloqueado: boolean): void {
    this.desbloqueado = desbloqueado;
  }

  // Métodos getter e setter para a quantidade
  getQuantidade(): number {
    return this.quantidade;
  }

  setQuantidade(quantidade: number): void {
    this.quantidade = quantidade;
    this.atualizarLucro(); 
  }
  
  private atualizarLucro(): void {
    // Atualiza o lucro com um aumento de 10% por unidade adicional
    this.lucro = this.lucro * Math.pow(1.1, this.quantidade);
  }

  getNome(): string {
    return this.nome;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getCusto(): number {
    return this.custo;
  }

  setCusto(custo: number): void {
    this.custo = custo;
  }

  getLucro(): number {
    return this.lucro;
  }

  setLucro(lucro: number): void {
    this.lucro = lucro;
  }

  getNivelEficiencia(): number {
    return this.nivelEficiencia;
  }

  setNivelEficiencia(nivelEficiencia: number): void {
    this.nivelEficiencia = nivelEficiencia;
  }

  // Método para atualizar o nível de eficiência do negócio
  atualizarEficiencia(novaEficiencia: number): void {
    this.nivelEficiencia = novaEficiencia;
  }

  calcularLucro(tempoDecorrido: number): number {
    if (tempoDecorrido >= this.tempoProducao) {
      return this.lucro;
    } else {
      return 0;
    }
  }
}
