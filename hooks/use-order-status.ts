import { OrderStatus } from "@/types/enums/order-status-enum";

export const useOrderStatus = (status: OrderStatus) => {
  if (status === OrderStatus.CREATED) return "Сборка";
  if (status === OrderStatus.DELIVERED) return "В пути";
  if (status === OrderStatus.TRANSFERRED) return "Передан курьеру";
  if (status === OrderStatus.ORDERED) return "Доставлен";
};
