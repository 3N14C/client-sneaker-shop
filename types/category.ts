import { SneakerType } from "./sneaker";

export type CategoryType = {
  id: string;
  name: string;
  img: string;
  sneakers: SneakerType[];
};
