export class Player {
    public coins: number;
  
    constructor(coins: number) {
      this.coins = coins;
    }
  
    // Método para obter a quantidade atual de moedasa
    getCoins(): number {
      return this.coins;
    }
  
    // Método para adicionar moedas ao jogador
    addCoins(amount: number): void {
      this.coins += amount;
    }
  
    // Método para remover moedas do jogador
    removeCoins(amount: number): void {
      if (this.coins >= amount) {
        this.coins -= amount;
      } else {
        console.log("Not enough coins!");
      }
    }
  }
  
  export default Player;
  