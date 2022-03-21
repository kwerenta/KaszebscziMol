import { Groups, PropertyGroups } from "./spaces";

type actionsWithNumber =
  | "collect"
  | "collectFromEveryPlayer"
  | "pay"
  | "payEachPlayer";

type Base<T> = { text: string } & T;

export type Card = Base<
  | {
      action: actionsWithNumber;
      payload: number;
    }
  | { action: "advanceToNearest"; payload: Groups }
  | { action: "goToJail"; payload: undefined }
>;

export const cards: Card[] = [
  {
    text: "Wygrywasz Snuff World Championship! Otrzymujesz 500$",
    action: "collect",
    payload: 500,
  },
  {
    text: "Turysta zapytał się, którędy do stolicy Kaszub. Pokazując trzy kierunki jednocześnie, wczasowicz okardł Cię. Tracisz 250$",
    action: "pay",
    payload: 250,
  },
  {
    text: "Otrzmujesz wezwanie na Browargedon. Zaproszenie zostało natychmiast przez Ciebie przyjęte, a tytuł mistrzowski trafia w twoje ręcej. Jako nagrodę dostajesz 300$",
    action: "collect",
    payload: 300,
  },
  {
    text: "W trakcie Bimbergedonu nie udało Ci się pokonać pierwszej konkurencji, jaką było wejście po schodach. Dla odbudowania wizerunku płacisz każdemu graczowi 50$",
    action: "payEachPlayer",
    payload: 50,
  },
  {
    text: "Deska sedesowa w toalecie gospodarza imprezy została przez Ciebie uszkodzona. Pokrywasz koszty i tracisz 100$",
    action: "pay",
    payload: 100,
  },
  {
    text: "Po wyjściu z Biedronki orientujesz się, że zakupiony zapas Be Powera został objęty podatkiem cukrowym. Przeznaczasz 50$ na rozwój państwa",
    action: "pay",
    payload: 50,
  },
  {
    text: "Dzięki zdobyciu wyniku 120% na praktyce zawodowej w ZSŁ, otrzymujesz międzynarodowy certyfikat. Reszta graczy z szacunku i zazdrości przekazuje Ci po 50$",
    action: "collectFromEveryPlayer",
    payload: 50,
  },
  {
    text: "Inwestujesz w budowę restauracji McDonalds w Kartuzach. Lokalni rolnicy zaczęli strajkować i grozić widłami przed twoim domem. Mieszkańcy ogłosili, że obecne od lat 70. bary mleczne są zdecydowanie lepsze od jakiegoś fast foodu. Z powodu nieudanej inwestycji tracisz 250$",
    action: "pay",
    payload: 350,
  },
  {
    text: "Udało Ci się zdobyć lody Ekipy. Po ich spożyciu, wystawiasz na serwis aukcyjny lekko zgnieciony papierek. Zdesperowana matka kupuje go od Ciebie dla swojego dziecka za 100$",
    action: "collect",
    payload: 100,
  },
  {
    text: "Mieszkając w lesie masz dobre kontakty z Rumunami. Otrzymujesz dostęp do luksusowych towarów takich jak Gerrikoll czy Gavin Kaiqin. Stajesz się resellerem i każdy kupuje od Ciebie roczny zapas za 25$",
    action: "collectFromEveryPlayer",
    payload: 25,
  },
  {
    text: "Po przejechaniu 20 kilometrów i napotkaniu drogi z górki twoja bestia Opel Astra zaczyna się rozpędzać. Niestety dogania Cię policja i wręcza Ci mandat w wysokości 150$ za utrudnianie ruchu",
    action: "pay",
    payload: 150,
  },
  {
    text: "Jako mieszkaniec Pomorskiej 13 czujesz, że Twoim obowiązkiem obywatelskim jest sprzedawanie dobrych chłopaków na komendzie. Za swoje zasługi zostajesz pobity, a każdy gracz wziął sobie 50$",
    action: "payEachPlayer",
    payload: 50,
  },
  {
    text: "Dzień przed Bimbergedonem zostały ogłoszone nowe obostrzenia. Impreza została przez Ciebie odwołana. Mimo to, następnego dnia zjawia się policja, która wręcza Ci mandat za niezorganizowanie fantastycznej imprezy. Płacisz 200$",
    action: "pay",
    payload: 200,
  },
  {
    text: "Trafiasz na najbliszą stację kolejową. Najnowsze rozwiązania technologiczne wprawiają Ciebie w zachwyt. Jesteś pod tak ogromnym wrażeniem, że postanawiasz zakupić dworzec. Jeśli ma już właściciela to z chęcią zapłacisz czynsz.",
    action: "advanceToNearest",
    payload: PropertyGroups.Train,
  },
  {
    text: "Dojeżdżasz na stację z jedynie 147 minutowym opóźnieniem. Nadprogramowy czas podróży uznajesz za dodatkową przyjemność z jazdy. Uznajesz, że warto kupić dworzec, aby zerowym kosztem doświadczać niezapomniane przeżycia. Jeżeli ktoś jest już jego właścicielem, to płacisz czynsz w ramach podziękowania za jakościowe usługi.",
    action: "advanceToNearest",
    payload: PropertyGroups.Train,
  },
  {
    text: "Twój znajomy kurier słusznie stwierdza, że picie czystego soku z cytryny powinno być nielegalne. W wyniku popełnienia tego niewybaczalnego czynu, sam postanawiasz udać się do więzienia.",
    action: "goToJail",
    payload: undefined,
  },
];
