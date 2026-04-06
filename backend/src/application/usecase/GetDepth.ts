import Order from "../../domain/Order";
import Registry, { inject } from "../../infra/di/Registry";
import OrderRepository from "../../infra/repository/OrderRepository";

export default class GetDepth {
    @inject("orderRepository")
    orderRepository!: OrderRepository;

    constructor() {
        this.orderRepository = Registry.getInstance().inject("orderRepository");
    }

    private groupOrder(orders: Order[]) {
        let index: { [price: number]: { quantity: number; price: number } } = {};
        for (const order of orders) {
            index[order.price] = index[order.price] || { quantity: 0, price: order.price };
            index[order.price]!.quantity += order.quantity;
        }
        return Object.values(index).sort((a, b) => a.price - b.price);
    }

    async execute(marketId: string): Promise<Output> {
        const orders = await this.orderRepository.getByMarketIdAndStatus(marketId, "open");
        const buys = this.groupOrder(orders.filter((order: Order) => order.side === "buy"));
        const sells = this.groupOrder(orders.filter((order: Order) => order.side === "sell"));
        return {
            marketId,
            buys,
            sells
        };
    }
}

type Output = {
    marketId: string;
    buys: { price: number; quantity: number }[];
    sells: { price: number; quantity: number }[];
}