import GroupOrder from "../../domain/GroupOrder";
import Order from "../../domain/Order";
import Registry, { inject } from "../../infra/di/Registry";
import OrderRepository from "../../infra/repository/OrderRepository";

export default class GetDepth {
    @inject("orderRepository")
    orderRepository!: OrderRepository;

    constructor() {
        this.orderRepository = Registry.getInstance().inject("orderRepository");
    }

    async execute(marketId: string): Promise<Output> {
        const orders = await this.orderRepository.getByMarketIdAndStatus(marketId, "open");
        const buys = GroupOrder.execute(orders.filter((order: Order) => order.side === "buy"));
        const sells = GroupOrder.execute(orders.filter((order: Order) => order.side === "sell"));
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