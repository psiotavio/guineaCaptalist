// BusinessManagerPrestige.ts
import { Business } from "./Business";
import BusinessManager from "./BusinessManager";
import { BusinessPrestige } from "./BusinessPrestige";

class BusinessManagerPrestige {
  public businessPrestigeList: BusinessPrestige[] = [];
  public initialBusinessPrestigeList: BusinessPrestige[] = [
     new BusinessPrestige(1, "Classic Guinea", 100, require("../../assets/gameImg/guinea1.png"), BusinessManager.getNegocio("Classic Guinea")!, false),
      
  ];




  private listeners: (() => void)[] = [];

  addListener(listener: () => void){
    this.listeners.push(listener);
  }

  removeListener(listener: () => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }



  notifyAll() {
    this.listeners.forEach((listener) => listener());
  }

  constructor() {
    this.resetPrestigeBusinesses();
  }

  // Métodos addListener, removeListener e notifyAll permanecem iguais

  // Retorna todos os negócios de prestígio
  getTodosOsNegociosPrestige(): BusinessPrestige[] {
    return this.businessPrestigeList.map((business) => {
      // Cria um novo objeto BusinessPrestige com os mesmos dados do BusinessPrestige
      return new BusinessPrestige(
        business.id,
        business.nome,
        business.valor,
        business.imagem,
        business.businessAlvo!,
        business.desbloqueado
      );
    });
  }

  setAuto(business: Business) {
    BusinessManager.AutomaticTrue(business.getNome())
    this.notifyAll()

  }
  
  getNegocio(nome: string): Business | undefined {
    return BusinessManager.todosNegocios.find((n) => n.getNome() === nome);
  }

  // Adiciona um novo negócio de prestígio à lista
  adicionarNegocioPrestige(negocio: BusinessPrestige): void {
    this.businessPrestigeList.push(negocio);
    this.initialBusinessPrestigeList.push(negocio); // Adiciona o negócio à lista inicial
  }

  // Reseta os negócios de prestígio
  resetPrestigeBusinesses(): void {
    this.businessPrestigeList = this.initialBusinessPrestigeList.map((business) => {
      // Reseta a quantidade para zero
      return new BusinessPrestige(
        business.id,
        business.nome,
        business.valor,
        business.imagem,
        business.businessAlvo!,
        business.desbloqueado
      );
    });
    this.notifyAll()
  }
}

export default new BusinessManagerPrestige();
