import { Business } from "./Business";

interface BusinessManagerState {
  nome: string;
  custo: number;
  lucro: number;
  nivelEficiencia: number;
  tempoProducao: number;
  lucroAtual: number;
  quantidade: number; // Adiciona a quantidade de itens
  desbloqueado: boolean; // Adiciona o status de desbloqueio
}

class BusinessManagerPrestige {
  public businessPrestigeList: Business[] = [];
  public initialBusinessPrestigeList: Business[] = [
    new Business("Classic Guinea", 100, 100, 1, 2, require("../../assets/gameImg/guinea1.png"), 0, true),
    new Business("Guinea Nerd", 500, 10000, 5, 120, require("../../assets/gameImg/guinea5.png"), 0, false),
  ];
  private listeners: (() => void )[] = [];

  constructor() {
    this.resetPrestigeBusinesses();
  }

  // Adiciona um listener para notificar mudanças
  addListener(listener: () => void): void {
    this.listeners.push(listener);
  }

  // Remove um listener
  removeListener(listener: () => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  // Notifica todos os listeners
  notifyAll(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Retorna todos os negócios de prestígio
  getTodosOsNegociosPrestige(): Business[] {
    return this.businessPrestigeList.map((business) => {
      // Cria um novo objeto Business com os mesmos dados do BusinessState
      return new Business(
        business.nome,
        business.custo,
        business.lucro,
        business.nivelEficiencia,
        business.tempoProducao,
        business.imagem,
        business.quantidade,
        business.desbloqueado
      );
    });
  }

  // Adiciona um novo negócio de prestígio à lista
  adicionarNegocioPrestige(negocio: Business): void {
    this.businessPrestigeList.push(negocio);
    this.initialBusinessPrestigeList.push(negocio); // Adiciona o negócio à lista inicial
  }

  // Reseta os negócios de prestígio
  resetPrestigeBusinesses(): void {
    this.businessPrestigeList = this.initialBusinessPrestigeList.map((business) => {
      // Reseta a quantidade para zero
      return new Business(
        business.nome,
        business.custo,
        business.lucro,
        business.nivelEficiencia,
        business.tempoProducao,
        business.imagem,
        0,
        business.desbloqueado
      );
    });
    this.notifyAll();
  }

  // Outros métodos para atualizar, remover e gerenciar negócios de prestígio podem ser adicionados conforme necessário
}

export default new BusinessManagerPrestige();
