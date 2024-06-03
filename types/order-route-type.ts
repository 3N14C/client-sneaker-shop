import { OrderType } from '@/types/order-type';
export type OrderRouteType = {
    id: string
    name: string
    address: string
    order: OrderType
    orderId: string
    createdAt: Date
}