import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import {
  faArrowRight,
  faCity,
  faTrain,
  faQuestion,
  faToolbox,
  faPlaceOfWorship,
  faTheaterMasks,
  faDungeon,
  faPaperPlane,
  faStoreAlt,
  faShoppingBasket,
  faParking,
  faFileInvoiceDollar,
  faChargingStation,
  faFaucet,
  faHouseUser,
  faUmbrellaBeach,
  faCocktail,
  faWarehouse,
  faUserSecret,
  faSchool,
  faTrashAlt,
  faGraduationCap,
  faWineGlassAlt,
  faWineGlass,
  faWineBottle,
} from "@fortawesome/free-solid-svg-icons";

interface BasicField {
  readonly name: string;
  readonly icon: IconDefinition;
  readonly group: number;
}
interface NonBuyableField extends BasicField {
  readonly price?: never;
  readonly rent?: never;
}
interface BuyableField extends BasicField {
  readonly price: number;
  readonly rent: number[];
}

type FieldData = NonBuyableField | BuyableField;
export type Field = FieldData & {
  owner: string;
  houses: number;
  mortgage: boolean;
};

export interface Group {
  readonly color: string;
  readonly housePrice: number;
}

export const groups: Group[] = [
  { color: "shadow-zinc-500", housePrice: 0 },
  { color: "shadow-amber-800", housePrice: 50 },
  { color: "shadow-cyan-500", housePrice: 50 },
  { color: "shadow-purple-800", housePrice: 100 },
  { color: "shadow-orange-400", housePrice: 100 },
  { color: "shadow-red-600", housePrice: 150 },
  { color: "shadow-yellow-400", housePrice: 150 },
  { color: "shadow-emerald-500", housePrice: 200 },
  { color: "shadow-sky-900", housePrice: 200 },
  { color: "shadow-stone-900", housePrice: 0 },
  { color: "#ccc", housePrice: 0 },
];

export const fields: FieldData[] = [
  { name: "START", group: 12, icon: faArrowRight },
  {
    name: "Plaża Ostrzyce",
    price: 60,
    group: 1,
    rent: [2, 10, 30, 90, 160, 250],
    icon: faUmbrellaBeach,
  },
  { name: "Kasa społeczna?", group: 10, icon: faToolbox },
  {
    name: "Ostrzycki domek",
    price: 60,
    group: 1,
    rent: [4, 20, 60, 180, 320, 450],
    icon: faHouseUser,
  },
  {
    name: "Tequila Gdańsk",
    price: 100,
    group: 2,
    rent: [6, 30, 90, 270, 400, 550],
    icon: faCocktail,
  },
  { name: "Podatek", group: 11, icon: faFileInvoiceDollar },
  {
    name: "SKM Gdańsk Żabianka - AWFiS",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: faTrain,
  },
  {
    name: "Garaże na Żabiance",
    price: 100,
    group: 2,
    rent: [6, 30, 90, 270, 400, 550],
    icon: faWarehouse,
  },
  {
    name: "Pomorska 13",
    price: 120,
    group: 2,
    rent: [8, 40, 100, 300, 450, 600],
    icon: faUserSecret,
  },
  { name: "Szansa?", group: 10, icon: faQuestion },
  {
    name: "TEB Gdańsk",
    price: 140,
    group: 3,
    rent: [10, 50, 150, 450, 625, 750],
    icon: faTrashAlt,
  },
  {
    name: "Elektrownia?",
    price: 150,
    group: 9,
    rent: [80],
    icon: faChargingStation,
  },
  { name: "Żukowo", group: 12, icon: faDungeon },
  {
    name: "ZSŁ w Gdańsku",
    price: 140,
    group: 3,
    rent: [10, 50, 150, 450, 625, 750],
    icon: faSchool,
  },
  {
    name: "Politechnika Gdańska",
    price: 160,
    group: 3,
    rent: [12, 60, 180, 500, 700, 900],
    icon: faGraduationCap,
  },
  {
    name: "Fiu Bździu",
    price: 180,
    group: 4,
    rent: [14, 70, 200, 550, 750, 950],
    icon: faWineGlassAlt,
  },
  {
    name: "PKM Sławki",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: faTrain,
  },
  { name: "Kasa społeczna?", group: 10, icon: faToolbox },
  {
    name: "Morzeimpreza.pl",
    price: 180,
    group: 4,
    rent: [14, 70, 200, 550, 750, 950],
    icon: faWineGlass,
  },
  {
    name: "Fiu Bździu VIP",
    price: 200,
    group: 4,
    rent: [16, 80, 220, 600, 800, 1000],
    icon: faWineBottle,
  },
  { name: "Najpiękniejsza wieś pomorska 2014", group: 12, icon: faParking },
  {
    name: "Dino Mściszewice",
    price: 220,
    group: 5,
    rent: [18, 90, 250, 700, 875, 1050],
    icon: faCity,
  },
  { name: "Szansa?", group: 10, icon: faQuestion },
  {
    name: "Dino Mściszewice",
    price: 220,
    group: 5,
    rent: [18, 90, 250, 700, 875, 1050],
    icon: faCity,
  },
  {
    name: "Dino Mściszewice",
    price: 240,
    group: 5,
    rent: [20, 100, 300, 750, 925, 1100],
    icon: faCity,
  },
  {
    name: "Kościerzyna",
    price: 260,
    group: 6,
    rent: [22, 110, 330, 800, 975, 1150],
    icon: faCity,
  },
  {
    name: "PKM Kartuzy",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: faTrain,
  },
  {
    name: "Kościerzyna",
    price: 260,
    group: 6,
    rent: [22, 110, 330, 800, 975, 1150],
    icon: faCity,
  },
  {
    name: "Kościerzyna",
    price: 280,
    group: 6,
    rent: [24, 120, 360, 850, 1025, 1200],
    icon: faCity,
  },
  { name: "Wodociągi?", price: 150, group: 9, icon: faFaucet, rent: [80] },
  { name: "Kasa społeczna?", group: 10, icon: faToolbox },
  {
    name: "Amfiteatr Szerokowidze Sierakowice",
    price: 300,
    group: 7,
    rent: [26, 130, 390, 900, 1100, 1275],
    icon: faTheaterMasks,
  },
  { name: "Idź do Żukowa", group: 13, icon: faPaperPlane },
  {
    name: "Ołtarz Papieski z Pelplina w Sierakowicach",
    price: 300,
    group: 7,
    rent: [26, 130, 390, 900, 1100, 1275],
    icon: faPlaceOfWorship,
  },
  {
    name: "Bazarek w Sierakowicach",
    price: 320,
    group: 7,
    rent: [28, 150, 450, 1000, 1200, 1400],
    icon: faShoppingBasket,
  },
  { name: "Szansa?", group: 10, icon: faQuestion },
  {
    name: "PKM Gołubie Kaszubskie",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: faTrain,
  },
  {
    name: "Dino Mściszewice",
    price: 350,
    group: 8,
    rent: [35, 175, 500, 1100, 1300, 1500],
    icon: faStoreAlt,
  },
  { name: "Podatek", group: 11, icon: faFileInvoiceDollar },
  {
    name: "Mściszevice City",
    price: 400,
    group: 8,
    rent: [50, 200, 600, 1400, 1700, 2000],
    icon: faCity,
  },
];
