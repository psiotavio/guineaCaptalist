// BusinessManager.ts
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
  private negociosIniciais: Business[]; // Armazena os negócios iniciais

  constructor() {
    this.listaNegocios = [];
    this.negociosIniciais = [];
  }

  // Método para adicionar um novo negócio à lista
  adicionarNegocio(negocio: Business): void {
    this.listaNegocios.push(negocio);
    this.negociosIniciais.push(negocio);
  }

  atualizarQuantidade(nome: string, novaQuantidade: number): void {
    const negocio = this.listaNegocios.find((n) => n.getNome() === nome);
    if (negocio) {
      negocio.setQuantidade(novaQuantidade);
    } else {
      console.error("Negócio não encontrado:", nome);
    }
  }

  getQuantidade(nome: string): number | undefined {
    const negocio = this.listaNegocios.find((n) => n.getNome() === nome);
    return negocio ? negocio.getQuantidade() : undefined;
  }

  atualizarNegocio(nome: string, novoNegocio: Business): void {
    const indice = this.listaNegocios.findIndex((n) => n.getNome() === nome);
    if (indice !== -1) {
      this.listaNegocios[indice] = novoNegocio;
    } else {
      console.error("Negócio não encontrado:", nome);
    }
  }

  removerNegocio(nome: string): void {
    this.listaNegocios = this.listaNegocios.filter((n) => n.getNome() !== nome);
  }

  getNegocio(nome: string): Business | undefined {
    return this.listaNegocios.find((n) => n.getNome() === nome);
  }

// Método para obter todos os negócios da lista
getTodosNegocios(tempoDecorrido: number): Business[] {
  // Calcula o lucro atual de cada negócio com base no tempo decorrido
  return this.listaNegocios.map((negocio) => {
    const desbloqueado = negocio.getDesbloqueado();
    console.log("Negócio:", negocio.getNome(), "Desbloqueado:", desbloqueado);
    return new Business(
      negocio.getNome(),
      negocio.getCusto(),
      negocio.getLucro(),
      negocio.getNivelEficiencia(),
      negocio.tempoProducao,
      negocio.imagem,
      negocio.getQuantidade(),
      negocio.getDesbloqueado()
    );
  });
}


  resetarNegocios(): void {
    this.listaNegocios = []; // Limpa a lista de negócios
    this.negociosIniciais.forEach((negocio) => {
      // Adiciona novamente todos os negócios iniciais à lista de negócios
      this.listaNegocios.push(new Business(
        negocio.getNome(),
        negocio.getCusto(),
        negocio.getLucro(),
        negocio.getNivelEficiencia(),
        negocio.tempoProducao,
        negocio.imagem,
        0, // Reseta a quantidade para zero
        false // Reseta o status de desbloqueio para falso
      ));
    });
  }
  
}
