function Gracz(nazwa, kolor = 'rgb(245, 246, 250)', awatar) {
    this.nazwa = nazwa;
    this.kolor = kolor;
    this.awatar = awatar;
    this.pieniadze = 1500;
    this.pozycja = 0;

    this.posiadane = [];

    this.zmianaPozycji = (kostka1, kostka2) => {
        this.pozycja += kostka1 + kostka2;
        if (this.pozycja > 39) {
            this.pozycja -= 40;
            this.dodajPieniadze(200);
        }
    };
    this.dodajPieniadze = (ile) => {
        this.pieniadze += ile;
    };
    this.odejmijPieniadze = (ile) => {
        this.pieniadze -= ile;
    };
    this.czyPieniadze = (ile) => {
        if (this.pieniadze - ile >= 0) return true;
        else {
            alert('Nie masz tyle pieniędzy!');
            return false;
        }
    };
    this.przelejPieniadze = (ile, komu) => {
        if (this.czyPieniadze(ile)) {
            this.odejmijPieniadze(ile);
            gracz[komu].dodajPieniadze(ile);
        }
    };
    this.dodajPosiadane = (co) => {
        this.posiadane.push(co);
    };
    this.kupPole = (ktore) => {
        if (this.czyPieniadze(pole[ktore].cena)) {
            this.odejmijPieniadze(pole[ktore].cena);
            this.dodajPosiadane(this.pozycja);
        }
    };
}

let gracz = [];
gracz[0] = new Gracz('Kamil', 'rgb(225, 177, 44)');
gracz[1] = new Gracz('Andrzej', 'rgb(232, 65, 24)');

let kostka1;
let kostka2;
let tura = 0;
let kto = 0;
let aktualny = 0;
let obecny;

function rzutKoscmi() {
    kostka1 = Math.floor(Math.random() * 6) + 1;
    kostka2 = Math.floor(Math.random() * 6) + 1;
}

function zmianaGracza() {
    aktualny = kolejnosc[kto] - 1;
    obecny = gracz[aktualny];
    kostka1 = 35;
    kostka2 = 10;
    obecny.zmianaPozycji(kostka1, kostka2);

    kto++;
    if (kto > liczba_graczy - 1) {
        kto = 0;
        tura++;
    }
    // gracz.findIndex((gracz) => gracz.nazwa === 'lol'); - Znajduje index gracza o nazwie 'lol'
    if (![0, 10, 20, 30].includes(obecny.pozycja)) {
        if (!pole[obecny.pozycja].czyWlasciciel(aktualny)) {
            if (pole[obecny.pozycja].wlasciciel == -1) {
                alert('nitk nie jest właścicielem');
            } else {
                alert('wlascicielem jest inny gracz');
            }
        } else {
            alert('jesteś właścicielem');
        }
    }
}
