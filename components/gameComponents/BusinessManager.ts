import { Business } from "./Business";

interface BusinessState {
  id: number;
  nome: string;
  custo: number;
  lucro: number;
  nivelEficiencia: number;
  tempoProducao: number;
  lucroAtual: number;
  quantidade: number; // Adiciona a quantidade de itens
  desbloqueado: boolean; // Adiciona o status de desbloqueio
  automatic: boolean;
}

 class BusinessManager {
  public listaNegocios: Business[] = [];
  public initialBusinessList: Business[] = [
    new Business(1,"Classic Guinea", 50, 5, 1, 4, require("../../assets/gameImg/guinea1.png"), 0, true, false),
    new Business(2,"Guinea Cops", 200, 20, 2, 10, require("../../assets/gameImg/guinea2.png"), 0, false,false),
    new Business(3,"Chef MR. Guinea", 500, 100, 3, 30, require("../../assets/gameImg/guinea3.png"), 0, false,false),
    new Business(4,"Guinea Dev.", 1000, 200, 4, 60, require("../../assets/gameImg/guinea4.png"), 0, false,false),
    new Business(5,"Guinea Nerd", 2500, 500, 5, 120, require("../../assets/gameImg/guinea5.png"), 0, false,false),
  ];
  private listeners: (() => void )[] = [];

  constructor() {
    this.resetarNegocios()
  }

  addListener(listener: () => void){
    this.listeners.push(listener);
  }

  removeListener(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }



  notifyAll() {
    this.listeners.forEach((listener) => listener());
  }

  get todosNegocios() {
    return this.listaNegocios.map((negocio) => {
      const desbloqueado = negocio.getDesbloqueado();
      // Aqui estamos criando um novo objeto Business com os mesmos dados do BusinessState
      return new Business(
        negocio.id,
        negocio.nome,
        negocio.custo,
        negocio.lucro,
        negocio.nivelEficiencia,
        negocio.tempoProducao,
        negocio.imagem,
        negocio.quantidade,
        negocio.desbloqueado,
        negocio.automatic
      );
    });
  }

  // Método para adicionar um novo negócio à lista
  adicionarNegocio(negocio: Business): void {
    this.listaNegocios.push(negocio);
    this.initialBusinessList.push(negocio); // Adiciona o negócio à lista inicial
  }

    // Método para adicionar um novo negócio à lista
    AutomaticTrue(negocio: string): void {
      this.getNegocio(negocio)?.setAutomatic(true);
      this.notifyAll();
    }

  resetarNegocios(): void {

    this.listaNegocios = this.initialBusinessList.map(negocio => {
      const negocioResetado = new Business(
        negocio.id,
        negocio.nome,
        negocio.custo,
        negocio.lucro,
        negocio.nivelEficiencia,
        negocio.tempoProducao,
        negocio.imagem,
        0, // Resetando a quantidade para zero
        negocio.desbloqueado,
        negocio.automatic,
        );
      return negocioResetado;
    });
    this.notifyAll()
  }
  
  setCoin(coin: number, negocio: string){
    const negocioUpdate = this.getNegocio(negocio);
    negocioUpdate?.setCusto(coin)
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
    const negocioEncontrado = this.listaNegocios.find((n) => n.getNome() === nome);
    return negocioEncontrado ? negocioEncontrado : undefined;
  }
  // Método para obter um negócio da lista pelo nome
  getNegocioByID(id: number): Business | undefined {
    const negocioEncontrado = this.listaNegocios.find((n) => n.getId() === id);
    return negocioEncontrado ? negocioEncontrado : undefined;
  }
  

  // Atualize a assinatura da função getTodosNegocios() para retornar Business[]
getTodosNegocios(tempoDecorrido: number): Business[] {
  // Calcula o lucro atual de cada negócio com base no tempo decorrido
  return this.listaNegocios.map((negocio) => {
    const desbloqueado = negocio.getDesbloqueado();
    // Aqui estamos criando um novo objeto Business com os mesmos dados do BusinessState
    return new Business(
      negocio.id,
      negocio.nome,
      negocio.custo,
      negocio.lucro,
      negocio.nivelEficiencia,
      negocio.tempoProducao,
      negocio.imagem,
      negocio.quantidade,
      negocio.desbloqueado,
      negocio.automatic
    );
  });
}
}
export default new BusinessManager();
