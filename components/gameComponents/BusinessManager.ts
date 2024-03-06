import { Business } from "./Business";

interface BusinessState {
  nome: string;
  custo: number;
  lucro: number;
  nivelEficiencia: number;
  tempoProducao: number;
  lucroAtual: number;
  quantidade: number; // Adiciona a quantidade de itens
  desbloqueado: boolean; // Adiciona o status de desbloqueio
}

export class BusinessManager {
  private listaNegocios: Business[];

  constructor() {
    this.listaNegocios = [];
  }

  // Método para adicionar um novo negócio à lista
  adicionarNegocio(negocio: Business): void {
    this.listaNegocios.push(negocio);
  }
  atualizarQuantidade(nome: string, novaQuantidade: number): void {
    const negocio = this.listaNegocios.find((n) => n.getNome() === nome);
    if (negocio) {
      negocio.setQuantidade(novaQuantidade);
    } else {
      console.error("Negócio não encontrado:", nome);
    }
  }

  // Método para obter a quantidade de um negócio da lista pelo nome
  getQuantidade(nome: string): number | undefined {
    const negocio = this.listaNegocios.find((n) => n.getNome() === nome);
    return negocio ? negocio.getQuantidade() : undefined;
  }

  // Método para atualizar um negócio na lista
  atualizarNegocio(nome: string, novoNegocio: Business): void {
    const indice = this.listaNegocios.findIndex((n) => n.getNome() === nome);
    if (indice !== -1) {
      this.listaNegocios[indice] = novoNegocio;
    } else {
      console.error("Negócio não encontrado:", nome);
    }
  }

  // Método para remover um negócio da lista
  removerNegocio(nome: string): void {
    this.listaNegocios = this.listaNegocios.filter((n) => n.getNome() !== nome);
  }

  // Método para obter um negócio da lista pelo nome
  getNegocio(nome: string): Business | undefined {
    return this.listaNegocios.find((n) => n.getNome() === nome);
  }

  // Método para obter todos os negócios da lista
  getTodosNegocios(tempoDecorrido: number): BusinessState[] {
    // Calcula o lucro atual de cada negócio com base no tempo decorrido
    return this.listaNegocios.map((negocio) => {
      const desbloqueado = negocio.getDesbloqueado();
      console.log("Negócio:", negocio.getNome(), "Desbloqueado:", desbloqueado);
      return {
        nome: negocio.getNome(),
        custo: negocio.getCusto(),
        lucro: negocio.getLucro(),
        nivelEficiencia: negocio.getNivelEficiencia(),
        tempoProducao: negocio.tempoProducao,
        lucroAtual: negocio.calcularLucro(tempoDecorrido),
        quantidade: negocio.getQuantidade(),
        desbloqueado: negocio.getDesbloqueado(),
      };
    });
  }
}
