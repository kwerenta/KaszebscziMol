export interface Card {
  text: string;
  action: "substract" | "add" | "payAll" | "getAll" | "goToJail";
  amount: number;
}

export const cards: Card[] = [
  { text: "Wygrywasz Snuff World Championship! Otrzymujesz 500$", action: "add", amount: 500 },
  {
    text:
      "Turysta zapytał się, którędy do stolicy Kaszub. Pokazując trzy kierunki świata zostałeś okradziony. Tracisz 250$",
    action: "substract",
    amount: 250,
  },
  {
    text:
      "Zostałeś zaproszony na Browargedon. Zaproszenie zostało natychmiast przyjęte, a tytuł mistrzowski trafia w twoje ręcej. Jako nagrodę dostajesz 300$",
    action: "add",
    amount: 300,
  },
  {
    text:
      "W trakcie Bimbergedonu nie udało Ci się pokonać pierwszej konkurencji, jaką było wejście po schodach. Dla odbudowania wizerunku płacisz każdemu graczowi 50$",
    action: "payAll",
    amount: 50,
  },
  {
    text:
      "Deskę sedesowa w toalecie gospodarza imprezy została przez Ciebie uszkodzona. Pokrywasz koszty i tracisz 100$",
    action: "substract",
    amount: 100,
  },
  {
    text:
      "Po wyjściu z Biedronki orientujesz się, że zakupiony zapas Be Power został objęty podatkiem cukrowym. Przeznaczno 50$ na rozwój państwa",
    action: "substract",
    amount: 50,
  },
  {
    text:
      "Dzięki zdobyciu wyniku 120% na praktyce zawodowej w ZSŁ, otrzymujesz międzynarodowy certyfikat. Reszta graczy z szacunku i zazdrości przekazuje Ci po 50$",
    action: "getAll",
    amount: 50,
  },
  {
    text:
      "Inwestujesz w budowę restauracji McDonalds w Kartuzach. Lokalni rolnicy zaczęli strajkować i grozić widłami przed twoim domem. Mieszkańcy ogłosili, że obecne od lat 70. bary mleczne są zdecydowanie lepsze od jakiegoś fast foodu. Z powodu nieudanej inwestycji tracisz 250$",
    action: "substract",
    amount: 350,
  },
  {
    text:
      "Udało Ci się zdobyć lody Ekipy. Po ich spożyciu, wystawiasz na serwis aukcyjny lekko zgnieciony papierek. Zdesperowana matka kupuje go swojemu dziecku na urodziny za 100$",
    action: "add",
    amount: 100,
  },
  {
    text:
      "Mieszkając w lesie masz dobre kontakty z Rumunami. Otrzymujesz dostęp do luksusowych towarów takich jak Gerrikoll czy Gavin Kaiqin. Stajesz się resellerem i każdy kupuje od Ciebie roczny zapas za 25$",
    action: "getAll",
    amount: 25,
  },
  {
    text:
      "Po przejechaniu 20 kilometrów i napotkaniu drogi z górki twoja bestia Opel Astra zaczyna się rozpędzać. Niestety dogania Cię policja i wręcza Ci mandat w wysokości 150$ za utrudnianie ruchu",
    action: "substract",
    amount: 150,
  },
  {
    text:
      "Jako mieszkaniec Pomorskiej 13 czujesz, że Twoim obowiązkiem obywatelskim jest sprzedawanie dobrych chłopaków na komendzie. Za swoje zasługi zostajesz pobity, a każdy gracz wziął sobie 50$",
    action: "payAll",
    amount: 50,
  },
  {
    text:
      "Dzień przed Bimbergedonem zostały ogłoszone nowe obostrzenia. Impreza została przez Ciebie odwołana. Mimo to, następnego dnia zjawia się policja, która wręcza Ci mandat za niezorganizowanie fantastycznej imprezy. Płacisz 200$",
    action: "substract",
    amount: 200,
  },
];
