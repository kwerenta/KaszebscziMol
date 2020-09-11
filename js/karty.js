function Pole(nazwa,cena,kolor,czynsz,czynsz1,czynsz2,czynsz3,czynsz4,czynsz5){
    this.nazwa = nazwa;
    this.cena = cena || 0;
    this.kolor = kolor || "#fff";
    this.czynsz = czynsz || 0;
    this.czynsz1 = czynsz1 || 0;
    this.czynsz2 = czynsz2 || 0;
    this.czynsz3 = czynsz3 || 0;
    this.czynsz4 = czynsz4 || 0;
    this.czynsz5 = czynsz5 || 0;
}

let pole = [40];

pole[0] = new Pole("START",400,"#303030",50);
pole[1] = new Pole("Dino Mściszewice",350,"#303030",80,150);

function Karta(tekst,dzialanie) {
    this.tekst = tekst;
    this.dzialanie = dzialanie;
}

let karta = [];

karta[0] = new Karta("Wygrałeś Snuff World Championship! Otrzymujesz 500$","Stworzyc funkcje dodaj i odejmij pieniadze");