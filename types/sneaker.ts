import { CategoryType } from "./category";
import { OfferType } from "./offer";
import { SizeType } from "./size";

export type SneakerType = {
  id: string;
  name: string;
  description: string;
  img: string[];
  price: number;
  soldCount: number;
  rating: number;
  createdAt: Date;

  category: CategoryType;
  offer: OfferType;
  sizes: SizeType[];
};
