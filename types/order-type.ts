import { OrderStatus } from "./enums/order-status-enum";
import { OrderRouteType } from "./order-route-type";
import { SneakerType } from "./sneaker";
import { UserType } from "./user";

export type OrderTypeRequest = {
  userId: string;
  orderSum: number;
  city: string;
  street: string;
  sneakerId: string[];
};

export type OrderType = {
  id: string;
  user: UserType;
  orderSum: number;
  city: string;
  street: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  sneakers: SneakerType[];
  orderRoute: OrderRouteType[]
};

export type OrderBySneakerIdType = {
  id: string;
  user: UserType;
  orderSum: number;
  city: string;
  street: string;
  orderStatus: OrderStatus;
  createdAt: Date;
  sneakers: SneakerType[]
  orderRoute: OrderRouteType[]
};