function Pole(nazwa, cena, kolor, czynsze = []) {
    this.nazwa = nazwa;
    this.cena = cena || 0;
    this.kolor = kolor || '#fff';

    this.czynsz = czynsze[0];

    this.domek = 0;

    this.wlasciciel = -1;

    this.czyWlasciciel = (kto) => {
        return this.wlasciciel == kto;
    };
    this.zmienWlasciciela = (kto) => {
        this.wlasciciel = kto;
    };
    this.dodajDomek = () => {
        this.domek++;
        this.zmienCzynsz();
    };
    this.zmienCzynsz = () => {
        this.czynsz = czynsze[this.domek];
    };
}

const pole = [40];

pole[0] = new Pole('START', 0, '#ee1919', 50);
pole[1] = new Pole('Wejherowo', 350, '#303030', [80, 150, 200, 350, 500, 750]);
pole[2] = new Pole('Kasa społeczna?', 350, '#303030', 80);
pole[3] = new Pole('Wejherowo', 350, '#303030', 80);
pole[4] = new Pole('Podatek?', 0, '#303030');
pole[5] = new Pole('PKM Kościerzyna', 200, '#303030', [80]);
pole[6] = new Pole('Kartuzy', 350, '#303030', [80]);
pole[7] = new Pole('Szansa?', 0, '#303030');
pole[8] = new Pole('Kartuzy', 350, '#303030', [80]);
pole[9] = new Pole('Kartuzy', 350, '#303030', [80]);
pole[10] = new Pole('Żukowo', 0, '#303030');
pole[12] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[11] = new Pole('Elektrownia?', 350, '#303030', [80]);
pole[13] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[14] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[15] = new Pole('PKM Babi Dół', 200, '#303030', [80]);
pole[16] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[17] = new Pole('Kasa społeczna?', 350, '#303030', [80]);
pole[18] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[19] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[20] = new Pole('Najpiękniejsza wieś pomorska 2014', 0, '#303030');
pole[21] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[22] = new Pole('Szansa?', 0, '#303030');
pole[23] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[24] = new Pole('Dino Mściszewice', 350, '#303030', [80]);
pole[25] = new Pole('PKM Kartuzy', 200, '#303030', [80]);
pole[26] = new Pole('Kościerzyna', 350, '#303030', [80]);
pole[27] = new Pole('Kościerzyna', 350, '#303030', [80]);
pole[28] = new Pole('Wodociągi?', 350, '#303030', [80]);
pole[29] = new Pole('Kościerzyna', 350, '#303030', [80]);
pole[30] = new Pole('Idź do Żukowa', 0, '#303030');
pole[31] = new Pole('Amfiteatr Szerokowidze Sierakowice', 350, '#303030', [80]);
pole[32] = new Pole('Ołtarz Papieski z Pelplina w Sierakowicach', 350, '#303030', [80]);
pole[33] = new Pole('Kasa społeczna?', 350, '#303030', [80]);
pole[34] = new Pole('Bazarek w Sierakowicach', 350, '#303030', [80]);
pole[35] = new Pole('PKM Gołubie Kaszubskie', 200, '#303030', [80]);
pole[36] = new Pole('Szansa?', 350, '#303030', [80]);
pole[37] = new Pole('Dino Mściszewice', 350, '#303030', [80, 150, 200, 350, 500, 750]);
pole[38] = new Pole('Podatek?', 350, '#303030', [80]);
pole[39] = new Pole('Mściszevice City', 400, '#303030', [80]);

function Karta(tekst, dzialanie, parametr) {
    this.tekst = tekst;
    this.parametr = parametr;
    this.dzialanie = dzialanie;

    this.wykonaj = () => {
        if (this.dzialanie == 'dodaj') return obecny.dodajPieniadze(this.parametr);
        else if (this.dzialanie == 'odejmij') return obecny.odejmijPieniadze(this.parametr);
        else if (this.dzialanie == 'kazdemu') return obecny.przelejKazdemu(this.parametr);
    };
}

const karta = [];

karta[0] = new Karta('Wygrywasz Snuff World Championship! Otrzymujesz 500$', 'dodaj', 500);
karta[1] = new Karta(
    'Turysta zapytał się, którędy do stolicy Kaszub. Pokazując trzy kierunki świata zostałeś okradziony. Tracisz 250$',
    'odejmij',
    250
);
karta[2] = new Karta(
    'Zostałeś zaproszony na Browargedon. Zaproszenie zostało natychmiast przyjęte, a tytuł mistrzowski trafia w twoje ręcej. Jako nagrodę dostajesz 300$',
    'dodaj',
    300
);
karta[3] = new Karta(
    'W trakcie Bimbergedonu nie udało Ci się pokonać pierwszej konkurencji, jaką było wejście po schodach. Dla odbudowania wizerunku płacisz każdemu graczowi 50$',
    'kazdemu',
    50
);
karta[4] = new Karta(
    'Uszkodziłeś deskę sedesową w toalecie gospodarza imprezy. Pokrywasz koszty i tracisz 100$',
    'odejmij',
    100
);
