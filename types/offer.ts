import { SneakerType } from "./sneaker";

export type OfferType = {
  id: string;
  name: string;
  description: string;
  discount: number;
  sneakers: SneakerType[];
};
