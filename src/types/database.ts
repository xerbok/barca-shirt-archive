export type Shirt = {
  id: string;
  season: string;
  competition: string | null;
  shirt_type: string;
  fabric_type: string | null;
  brand: string | null;
  player_name: string | null;
  number: number | null;
  size: string | null;
  condition: string | null;
  authenticity: string | null;
  purchase_price: number | null;
  purchase_date: string | null;
  purchase_place: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ShirtImage = {
  id: string;
  shirt_id: string | null;
  image_url: string;
  image_path: string | null;
  image_type: string | null;
  is_main: boolean | null;
  created_at: string | null;
};

export type Tag = {
  id: string;
  name: string;
};

export type ShirtTag = {
  shirt_id: string;
  tag_id: string;
};

export type ShirtWithImages = Shirt & {
  images: ShirtImage[];
};

export type ShirtWithMainImage = Shirt & {
  main_image: ShirtImage | null;
};

export type CreateShirtInput = Pick<Shirt, "season" | "shirt_type"> &
  Partial<
    Omit<Shirt, "id" | "season" | "shirt_type" | "created_at" | "updated_at">
  >;

export type UpdateShirtInput = Partial<CreateShirtInput>;

export type CreateShirtImageInput = Pick<
  ShirtImage,
  "shirt_id" | "image_url"
> &
  Partial<Omit<ShirtImage, "id" | "shirt_id" | "image_url" | "created_at">>;
