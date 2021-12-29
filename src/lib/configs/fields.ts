export interface Field {
  readonly name: string;
  readonly price?: number;
  readonly group: number;
  readonly rent?: number[];
  owner?: string;
  houses?: number;
}

export interface Group {
  readonly color: string;
  readonly housePrice: number;
}

export const groups: Group[] = [
  { color: "shadow-zinc-300", housePrice: 0 },
  { color: "shadow-amber-900", housePrice: 50 },
  { color: "shadow-blue-500", housePrice: 50 },
  { color: "shadow-fuchsia-600", housePrice: 100 },
  { color: "shadow-orange-400", housePrice: 100 },
  { color: "shadow-red-500", housePrice: 150 },
  { color: "shadow-yellow-400", housePrice: 150 },
  { color: "shadow-green-600", housePrice: 200 },
  { color: "shadow-sky-800", housePrice: 200 },
  { color: "shadow-stone-500", housePrice: 0 },
  { color: "#ccc", housePrice: 0 },
];

export const fields: Field[] = [
  { name: "START", group: 12 },
  { name: "Wejherowo", price: 60, group: 1, rent: [2, 10, 30, 90, 160, 250] },
  { name: "Kasa społeczna?", group: 10 },
  { name: "Wejherowo", price: 60, group: 1, rent: [4, 20, 60, 180, 320, 450] },
  { name: "Podatek cukrowy", group: 11 },
  { name: "PKM Kościerzyna", price: 200, group: 0, rent: [25, 50, 100, 200] },
  { name: "Kartuzy", price: 100, group: 2, rent: [6, 30, 90, 270, 400, 550] },
  { name: "Szansa?", group: 10 },
  { name: "Kartuzy", price: 100, group: 2, rent: [6, 30, 90, 270, 400, 550] },
  { name: "Kartuzy", price: 120, group: 2, rent: [8, 40, 100, 300, 450, 600] },
  { name: "Żukowo", group: 12 },
  {
    name: "Dino Mściszewice",
    price: 140,
    group: 3,
    rent: [10, 50, 150, 450, 625, 750],
  },
  { name: "Elektrownia?", price: 150, group: 9, rent: [80] },
  {
    name: "Dino Mściszewice",
    price: 140,
    group: 3,
    rent: [10, 50, 150, 450, 625, 750],
  },
  {
    name: "Dino Mściszewice",
    price: 160,
    group: 3,
    rent: [12, 60, 180, 500, 700, 900],
  },
  { name: "PKM Sławki", price: 200, group: 0, rent: [25, 50, 100, 200] },
  {
    name: "Dino Mściszewice",
    price: 180,
    group: 4,
    rent: [14, 70, 200, 550, 750, 950],
  },
  { name: "Kasa społeczna?", group: 10 },
  {
    name: "Dino Mściszewice",
    price: 180,
    group: 4,
    rent: [14, 70, 200, 550, 750, 950],
  },
  {
    name: "Dino Mściszewice",
    price: 200,
    group: 4,
    rent: [16, 80, 220, 600, 800, 1000],
  },
  { name: "Najpiękniejsza wieś pomorska 2014", group: 12 },
  {
    name: "Dino Mściszewice",
    price: 220,
    group: 5,
    rent: [18, 90, 250, 700, 875, 1050],
  },
  { name: "Szansa?", group: 10 },
  {
    name: "Dino Mściszewice",
    price: 220,
    group: 5,
    rent: [18, 90, 250, 700, 875, 1050],
  },
  {
    name: "Dino Mściszewice",
    price: 240,
    group: 5,
    rent: [20, 100, 300, 750, 925, 1100],
  },
  { name: "PKM Kartuzy", price: 200, group: 0, rent: [25, 50, 100, 200] },
  {
    name: "Kościerzyna",
    price: 260,
    group: 6,
    rent: [22, 110, 330, 800, 975, 1150],
  },
  {
    name: "Kościerzyna",
    price: 260,
    group: 6,
    rent: [22, 110, 330, 800, 975, 1150],
  },
  { name: "Wodociągi?", price: 150, group: 9 },
  {
    name: "Kościerzyna",
    price: 280,
    group: 6,
    rent: [24, 120, 360, 850, 1025, 1200],
  },
  { name: "Idź do Żukowa", group: 13 },
  {
    name: "Amfiteatr Szerokowidze Sierakowice",
    price: 300,
    group: 7,
    rent: [26, 130, 390, 900, 1100, 1275],
  },
  {
    name: "Ołtarz Papieski z Pelplina w Sierakowicach",
    price: 300,
    group: 7,
    rent: [26, 130, 390, 900, 1100, 1275],
  },
  { name: "Kasa społeczna?", group: 10 },
  {
    name: "Bazarek w Sierakowicach",
    price: 320,
    group: 7,
    rent: [28, 150, 450, 1000, 1200, 1400],
  },
  {
    name: "PKM Gołubie Kaszubskie",
    price: 200,
    group: 0,
    rent: [25, 50, 100, 200],
  },
  { name: "Szansa?", group: 10 },
  {
    name: "Dino Mściszewice",
    price: 350,
    group: 8,
    rent: [35, 175, 500, 1100, 1300, 1500],
  },
  { name: "Podatek?", group: 11 },
  {
    name: "Mściszevice City",
    price: 400,
    group: 8,
    rent: [50, 200, 600, 1400, 1700, 2000],
  },
];
