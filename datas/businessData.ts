import { Business } from "../components/gameComponents/Business";
import { BusinessManager } from "../components/gameComponents/BusinessManager";

// Função que inicializa e retorna instâncias do BusinessManager e das classes Business
export function inicializarNegocios(): { businessManager: BusinessManager, businesses: Business[] } {
  // Criar uma instância do BusinessManager
  const businessManager = new BusinessManager();

  // Criar 5 instâncias da classe Business
  const business1 = new Business("Classic Guinea", 100, 100, 1, 5, require("../assets/gameImg/guinea1.png"), 0, true);
  const business2 = new Business("Guinea Cops", 200, 500, 2, 10, require("../assets/gameImg/guinea2.png"), 0, false);
  const business3 = new Business("Chef MR. Guinea", 300, 1000, 3, 30, require("../assets/gameImg/guinea3.png"), 0, false);
  const business4 = new Business("Guinea Dev.", 400, 5000, 4, 60, require("../assets/gameImg/guinea4.png"), 0, false);
  const business5 = new Business("Guinea Nerd", 500, 10000, 5, 120, require("../assets/gameImg/guinea5.png"), 0, false);

  // Adicionar os negócios ao BusinessManager
  businessManager.adicionarNegocio(business1);
  businessManager.adicionarNegocio(business2);
  businessManager.adicionarNegocio(business3);
  businessManager.adicionarNegocio(business4);
  businessManager.adicionarNegocio(business5);

  // Retornar o BusinessManager e as instâncias das classes Business
  return { businessManager, businesses: [business1, business2, business3, business4, business5] };
}
