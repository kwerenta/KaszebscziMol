function Pole(nazwa, cena, kolor, czynsze = [], cenaDomek) {
    this.nazwa = nazwa;
    this.cena = cena || 0;
    this.hipoteka = cena / 2;
    this.kolor = kolor || '#f5f6fa';

    this.czynsz = czynsze[0] || 0;

    this.domek = 0;
    this.cenaDomek = cenaDomek;

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

pole[0] = new Pole('START', 0, '#ee1919');
pole[1] = new Pole('Wejherowo', 60, '#955436', [2, 10, 30, 90, 160, 250], 50);
pole[2] = new Pole('Kasa społeczna?');
pole[3] = new Pole('Wejherowo', 60, '#955436', [4, 20, 60, 180, 320, 450], 50);
pole[4] = new Pole('Podatek?');
pole[5] = new Pole('PKM Kościerzyna', 200, '#000', [25, 50, 100, 200]);
pole[6] = new Pole('Kartuzy', 100, '#AAE0FA', [6, 30, 90, 270, 400, 550], 50);
pole[7] = new Pole('Szansa?');
pole[8] = new Pole('Kartuzy', 100, '#AAE0FA', [6, 30, 90, 270, 400, 550], 50);
pole[9] = new Pole('Kartuzy', 120, '#AAE0FA', [8, 40, 100, 300, 450, 600], 50);
pole[10] = new Pole('Żukowo');
pole[11] = new Pole('Dino Mściszewice', 140, '#D93A96', [10, 50, 150, 450, 625, 750], 100);
pole[12] = new Pole('Elektrownia?', 150, '#303030', [80]);
pole[13] = new Pole('Dino Mściszewice', 140, '#D93A96', [10, 50, 150, 450, 625, 750], 100);
pole[14] = new Pole('Dino Mściszewice', 160, '#D93A96', [12, 60, 180, 500, 700, 900], 100);
pole[15] = new Pole('PKM Babi Dół', 200, '#000', [25, 50, 100, 200]);
pole[16] = new Pole('Dino Mściszewice', 180, '#F7941D', [14, 70, 200, 550, 750, 950], 100);
pole[17] = new Pole('Kasa społeczna?');
pole[18] = new Pole('Dino Mściszewice', 180, '#F7941D', [14, 70, 200, 550, 750, 950], 100);
pole[19] = new Pole('Dino Mściszewice', 200, '#F7941D', [16, 80, 220, 600, 800, 1000], 100);
pole[20] = new Pole('Najpiękniejsza wieś pomorska 2014', 0, '#303030');
pole[21] = new Pole('Dino Mściszewice', 220, '#ED1B24', [18, 90, 250, 700, 875, 1050], 150);
pole[22] = new Pole('Szansa?');
pole[23] = new Pole('Dino Mściszewice', 220, '#ED1B24', [18, 90, 250, 700, 875, 1050], 150);
pole[24] = new Pole('Dino Mściszewice', 240, '#ED1B24', [20, 100, 300, 750, 925, 1100], 150);
pole[25] = new Pole('PKM Kartuzy', 200, '#000', [25, 50, 100, 200]);
pole[26] = new Pole('Kościerzyna', 260, '#FEF200', [22, 110, 330, 800, 975, 1150], 150);
pole[27] = new Pole('Kościerzyna', 260, '#FEF200', [22, 110, 330, 800, 975, 1150], 150);
pole[28] = new Pole('Wodociągi?', 150, '#303030', [80]);
pole[29] = new Pole('Kościerzyna', 280, '#FEF200', [24, 120, 360, 850, 1025, 1200], 150);
pole[30] = new Pole('Idź do Żukowa', 0, '#303030');
pole[31] = new Pole('Amfiteatr Szerokowidze Sierakowice', 300, '#1FB25A', [26, 130, 390, 900, 1100, 1275], 200);
pole[32] = new Pole('Ołtarz Papieski z Pelplina w Sierakowicach', 300, '#1FB25A', [26, 130, 390, 900, 1100, 1275], 200);
pole[33] = new Pole('Kasa społeczna?');
pole[34] = new Pole('Bazarek w Sierakowicach', 320, '#1FB25A', [28, 150, 450, 1000, 1200, 1400], 200);
pole[35] = new Pole('PKM Gołubie Kaszubskie', 200, '#000', [25, 50, 100, 200]);
pole[36] = new Pole('Szansa?');
pole[37] = new Pole('Dino Mściszewice', 350, '#0072BB', [35, 175, 500, 1100, 1300, 1500], 200);
pole[38] = new Pole('Podatek?');
pole[39] = new Pole('Mściszevice City', 400, '#0072BB', [50, 200, 600, 1400, 1700, 2000], 200);

function Karta(tekst, dzialanie, parametr) {
    this.tekst = tekst;
    this.parametr = parametr;
    this.dzialanie = dzialanie;

    // Wykonanie funkcji w zależności od działania określonego w karcie
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
