import type { CollectionStat, CollectionTask, Shirt } from "@/types/shirt";

export const stats: CollectionStat[] = [
  {
    label: "Samarretes registrades",
    value: "24",
    detail: "Peces físiques pendents de catalogació completa.",
  },
  {
    label: "Temporades cobertes",
    value: "14",
    detail: "Des de clàssiques recents fins a equipacions actuals.",
  },
  {
    label: "Pendents de foto",
    value: "6",
    detail: "Cal afegir imatges frontals, dorsals i etiquetes.",
  },
  {
    label: "Ubicacions",
    value: "4",
    detail: "Capses, penjadors i fundes separades per estat.",
  },
];

export const featuredShirts: Shirt[] = [
  {
    id: "home-2010-11",
    season: "2010/11",
    kind: "Primera equipació",
    number: "10 Messi",
    condition: "Molt bona",
    location: "Funda principal",
  },
  {
    id: "away-2014-15",
    season: "2014/15",
    kind: "Segona equipació",
    number: "Sense dorsal",
    condition: "Bona",
    location: "Capsa blaugrana",
  },
  {
    id: "home-2018-19",
    season: "2018/19",
    kind: "Primera equipació",
    number: "8 Iniesta",
    condition: "Revisar",
    location: "Penjador estiu",
  },
  {
    id: "third-2022-23",
    season: "2022/23",
    kind: "Tercera equipació",
    number: "Pedri",
    condition: "Excel·lent",
    location: "Funda nova",
  },
];

export const tasks: CollectionTask[] = [
  {
    title: "Completar fitxes",
    description:
      "Afegir talla, fabricant, dorsal, pegats i notes de compra per a cada peça.",
  },
  {
    title: "Fer fotografies",
    description:
      "Preparar una sessió simple amb frontal, dorsal, etiqueta interior i detalls.",
  },
  {
    title: "Ordenar ubicacions",
    description:
      "Assignar una ubicació física estable per trobar cada samarreta ràpidament.",
  },
];
