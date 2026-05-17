export type ShirtCondition = "Excel·lent" | "Molt bona" | "Bona" | "Revisar";

export type Shirt = {
  id: string;
  season: string;
  kind: string;
  number: string;
  condition: ShirtCondition;
  location: string;
};

export type CollectionStat = {
  label: string;
  value: string;
  detail: string;
};

export type CollectionTask = {
  title: string;
  description: string;
};
