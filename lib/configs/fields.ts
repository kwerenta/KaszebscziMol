import { IconName, library } from "@fortawesome/fontawesome-svg-core";
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
library.add(
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
  faWineBottle
);

interface BasicField {
  readonly name: string;
  readonly icon: IconName;
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
  { name: "START", group: 12, icon: "arrow-right" },
  {
    name: "Plaża Ostrzyce",
    price: 60,
    group: 1,
    rent: [2, 10, 30, 90, 160, 250],
    icon: "umbrella-beach",
  },
  { name: "Kasa społeczna?", group: 10, icon: "toolbox" },
  {
    name: "Ostrzycki domek",
    price: 60,
    group: 1,
    rent: [4, 20, 60, 180, 320, 450],
    icon: "house-user",
  },
  {
    name: "Tequila Gdańsk",
    price: 100,
    group: 2,
    rent: [6, 30, 90, 270, 400, 550],
    icon: "cocktail",
  },
  { name: "Podatek", group: 11, icon: "file-invoice-dollar" },
  {
    name: "SKM Gdańsk Żabianka - AWFiS",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: "train",
  },
  {
    name: "Garaże na Żabiance",
    price: 100,
    group: 2,
    rent: [6, 30, 90, 270, 400, 550],
    icon: "warehouse",
  },
  {
    name: "Pomorska 13",
    price: 120,
    group: 2,
    rent: [8, 40, 100, 300, 450, 600],
    icon: "user-secret",
  },
  { name: "Szansa?", group: 10, icon: "question" },
  {
    name: "TEB Gdańsk",
    price: 140,
    group: 3,
    rent: [10, 50, 150, 450, 625, 750],
    icon: "trash-alt",
  },
  {
    name: "Elektrownia?",
    price: 150,
    group: 9,
    rent: [80],
    icon: "charging-station",
  },
  { name: "Żukowo", group: 12, icon: "dungeon" },
  {
    name: "ZSŁ w Gdańsku",
    price: 140,
    group: 3,
    rent: [10, 50, 150, 450, 625, 750],
    icon: "school",
  },
  {
    name: "Politechnika Gdańska",
    price: 160,
    group: 3,
    rent: [12, 60, 180, 500, 700, 900],
    icon: "graduation-cap",
  },
  {
    name: "Fiu Bździu",
    price: 180,
    group: 4,
    rent: [14, 70, 200, 550, 750, 950],
    icon: "wine-glass-alt",
  },
  {
    name: "PKM Sławki",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: "train",
  },
  { name: "Kasa społeczna?", group: 10, icon: "toolbox" },
  {
    name: "Morzeimpreza.pl",
    price: 180,
    group: 4,
    rent: [14, 70, 200, 550, 750, 950],
    icon: "wine-glass",
  },
  {
    name: "Fiu Bździu VIP",
    price: 200,
    group: 4,
    rent: [16, 80, 220, 600, 800, 1000],
    icon: "wine-bottle",
  },
  { name: "Najpiękniejsza wieś pomorska 2014", group: 12, icon: "parking" },
  {
    name: "Dino Mściszewice",
    price: 220,
    group: 5,
    rent: [18, 90, 250, 700, 875, 1050],
    icon: "city",
  },
  { name: "Szansa?", group: 10, icon: "question" },
  {
    name: "Dino Mściszewice",
    price: 220,
    group: 5,
    rent: [18, 90, 250, 700, 875, 1050],
    icon: "city",
  },
  {
    name: "Dino Mściszewice",
    price: 240,
    group: 5,
    rent: [20, 100, 300, 750, 925, 1100],
    icon: "city",
  },
  {
    name: "Kościerzyna",
    price: 260,
    group: 6,
    rent: [22, 110, 330, 800, 975, 1150],
    icon: "city",
  },
  {
    name: "PKM Kartuzy",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: "train",
  },
  {
    name: "Kościerzyna",
    price: 260,
    group: 6,
    rent: [22, 110, 330, 800, 975, 1150],
    icon: "city",
  },
  {
    name: "Kościerzyna",
    price: 280,
    group: 6,
    rent: [24, 120, 360, 850, 1025, 1200],
    icon: "city",
  },
  { name: "Wodociągi?", price: 150, group: 9, icon: "faucet", rent: [80] },
  { name: "Kasa społeczna?", group: 10, icon: "toolbox" },
  {
    name: "Amfiteatr Szerokowidze Sierakowice",
    price: 300,
    group: 7,
    rent: [26, 130, 390, 900, 1100, 1275],
    icon: "theater-masks",
  },
  { name: "Idź do Żukowa", group: 13, icon: "paper-plane" },
  {
    name: "Ołtarz Papieski z Pelplina w Sierakowicach",
    price: 300,
    group: 7,
    rent: [26, 130, 390, 900, 1100, 1275],
    icon: "place-of-worship",
  },
  {
    name: "Bazarek w Sierakowicach",
    price: 320,
    group: 7,
    rent: [28, 150, 450, 1000, 1200, 1400],
    icon: "shopping-basket",
  },
  { name: "Szansa?", group: 10, icon: "question" },
  {
    name: "PKM Gołubie Kaszubskie",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
    icon: "train",
  },
  {
    name: "Dino Mściszewice",
    price: 350,
    group: 8,
    rent: [35, 175, 500, 1100, 1300, 1500],
    icon: "store-alt",
  },
  { name: "Podatek", group: 11, icon: "file-invoice-dollar" },
  {
    name: "Mściszevice City",
    price: 400,
    group: 8,
    rent: [50, 200, 600, 1400, 1700, 2000],
    icon: "city",
  },
];
