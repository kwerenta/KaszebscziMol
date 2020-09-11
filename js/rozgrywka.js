function Gracz(nazwa,kolor = "rgb(245, 246, 250)",awatar) {
    this.nazwa = nazwa;
    this.kolor = kolor;
    this.awatar = awatar;
    this.pieniadze = 1500;
    this.pozycja = 0;
}

let gracz = [];

gracz[0] = new Gracz ();
gracz[1] = new Gracz ();