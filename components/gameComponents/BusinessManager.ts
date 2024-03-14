import { Business } from "./Business";
import AsyncStorage from '@react-native-async-storage/async-storage';


interface BusinessState {
  imagem: string;
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
    this.carregarNegocios();
  }

  onBusinessesLoaded(callback: () => void) {
    // Verifica se a lista de negócios já foi carregada
    if (this.listaNegocios.length > 0) {
      callback(); // Chama o callback imediatamente se os negócios já estiverem carregados
    } else {
      // Se os negócios ainda não estiverem carregados, adicione o callback à lista de ouvintes
      this.listeners.push(callback);
    }
  }

  async carregarNegocios() {
    try {
      const jsonValue = await AsyncStorage.getItem('@negocios');
      if (jsonValue !== null) {
        const negocios = JSON.parse(jsonValue);
        this.listaNegocios = negocios.map((negocio: BusinessState) => {
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
      console.log('Carregou:', this.listaNegocios.at(0)?.getCusto());
      // Após carregar os negócios, notifique todos os ouvintes
      this.notifyAll();
    } catch (e) {
      console.error('Erro ao carregar negócios:', e);
    }
  }


   // Método para salvar os negócios no AsyncStorage
   async salvarNegocios() {
    try {
      const jsonValue = JSON.stringify(this.listaNegocios.map(negocio => ({
        id: negocio.id,
        nome: negocio.nome,
        custo: negocio.custo,
        lucro: negocio.lucro,
        nivelEficiencia: negocio.nivelEficiencia,
        tempoProducao: negocio.tempoProducao,
        imagem: negocio.imagem,
        quantidade: negocio.quantidade,
        desbloqueado: negocio.desbloqueado,
        automatic: negocio.automatic,
      })));
      await AsyncStorage.setItem('@negocios', jsonValue);
      console.log('salvou!', this.listaNegocios.at(0)?.getCusto());
    } catch (e) {
      console.error('Erro ao salvar negócios:', e);
    }
  }


  

  addListener(listener: () => void){
    this.listeners.push(listener);
    this.salvarNegocios();
  }

  removeListener(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
    this.salvarNegocios();
  }



  notifyAll() {
    this.listeners.forEach((listener) => listener());
    this.salvarNegocios();
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

    // Salva os negócios após a adição
    this.salvarNegocios();
  }

    // Método para adicionar um novo negócio à lista
    AutomaticTrue(negocio: string): void {
      this.getNegocio(negocio)?.setAutomatic(true);
      this.notifyAll();
      this.salvarNegocios();
    }

// Método para reiniciar os negócios
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

  this.notifyAll();

  // Salva os negócios após o reset
  this.salvarNegocios();
}
  
  setCoin(coin: number, negocio: string){
    const negocioUpdate = this.getNegocio(negocio);
    negocioUpdate?.setCusto(coin)
    this.salvarNegocios();
  }

  setValue(coin: number, negocio: string){
    const negocioUpdate = this.getNegocio(negocio);
    negocioUpdate?.setLucro(coin * Math.pow(1.1, negocioUpdate.getQuantidade()));
    this.salvarNegocios();
  }

  setAuto(negocio: string){
    const negocioUpdate = this.getNegocio(negocio);
    negocioUpdate?.setAutomatic(true);
    this.salvarNegocios();
  }

  atualizarQuantidade(nome: string, novaQuantidade: number): void {
    const negocio = this.listaNegocios.find((n) => n.getNome() === nome);
    if (negocio) {
      negocio.setQuantidade(novaQuantidade);
      this.salvarNegocios();

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
      this.salvarNegocios();
    } else {
      console.error("Negócio não encontrado:", nome);
    }
  }

  // Método para remover um negócio da lista
  removerNegocio(nome: string): void {
    this.listaNegocios = this.listaNegocios.filter((n) => n.getNome() !== nome);
    this.salvarNegocios();
  }

  // Método para obter um negócio da lista pelo nome
  getNegocio(nome: string): Business | undefined {
    const negocioEncontrado = this.listaNegocios.find((n) => n.getNome() === nome);
    return negocioEncontrado ? negocioEncontrado : undefined;
  }
  // Método para obter um negócio da lista pelo nome
  getNegocioByID(id: number): Business | undefined {
    const negocioEncontrado = this.listaNegocios.find((n) => n.getId() === id);
    console.log("TAPEGANO", negocioEncontrado)
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
