function Pole(nazwa, cena, kolor, czynsz = []) {
    this.nazwa = nazwa;
    this.cena = cena || 0;
    this.kolor = kolor || '#fff';

    this.czynsz = czynsz;

    this.domek = 0;

    this.wlasciciel = -1;

    this.czyWlasciciel = (kto) => {
        return this.wlasciciel == kto;
    };
    this.zmienWlasciciela = (kto) => {
        this.wlasciciel = kto;
    };
}

const pole = [40];

pole[0] = new Pole('START', 0, '#303030', 50);
pole[1] = new Pole('Dino Mściszewice', 350, '#303030', [80, 150, 200, 350, 500, 750]);
pole[2] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[3] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[4] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[5] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[6] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[7] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[8] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[9] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[10] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[11] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[12] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[13] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[14] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[15] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[16] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[17] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[18] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[19] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[20] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[21] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[22] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[23] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[24] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[25] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[26] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[27] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[28] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[29] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[30] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[31] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[32] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[33] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[34] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[35] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[36] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[37] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[38] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);
pole[39] = new Pole('Dino Mściszewice', 350, '#303030', 80, 150);

function Karta(tekst, dzialanie) {
    this.tekst = tekst;
    this.dzialanie = dzialanie;
}

const karta = [];

karta[0] = new Karta(
    'Wygrałeś Snuff World Championship! Otrzymujesz 500$',
    'Stworzyc funkcje dodaj i odejmij pieniadze'
);
