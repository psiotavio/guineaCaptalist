export class PrestigeSystem {
    private prestigioAtual: number;
    private moedasPrestigio: number;

    constructor() {
        this.prestigioAtual = 0;
        this.moedasPrestigio = 0;
    }

    // Método para fazer prestígio
    fazerPrestigio(): void {
        this.prestigioAtual++;
        // Simular ganho de moedas de prestígio com base no prestígio atual
        this.moedasPrestigio += Math.floor(this.prestigioAtual * 10); // Exemplo: 10 moedas por prestígio
        console.log("Prestígio feito! Prestígio atual:", this.prestigioAtual, "Moedas de Prestígio:", this.moedasPrestigio);
    }

    // Método para gastar moedas de prestígio em melhorias ou recursos especiais
    gastarMoedasPrestigio(qtdMoedas: number): void {
        if (this.moedasPrestigio >= qtdMoedas) {
            // Lógica para gastar as moedas de prestígio e aplicar as melhorias ou desbloquear recursos especiais
            this.moedasPrestigio -= qtdMoedas;
            console.log("Moedas de Prestígio gastas. Moedas de Prestígio restantes:", this.moedasPrestigio);
        } else {
            console.error("Moedas de Prestígio insuficientes!");
        }
    }
}
