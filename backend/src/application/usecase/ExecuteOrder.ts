import Order from "../../domain/Order";
import Registry, { inject } from "../../infra/di/Registry";
import OrderRepository from "../../infra/repository/OrderRepository";

export default class ExecuteOrder {
    @inject("orderRepository")
    private orderRepository!: OrderRepository;

    constructor() {
        this.orderRepository = Registry.getInstance().inject("orderRepository");
    }

    async execute(marketId: string): Promise<void> {
        while (true) {
            const orders = await this.orderRepository.getByMarketIdAndStatus(marketId, "open");
            const buys = orders.filter((order: Order) => order.side === "buy").sort((a, b) => b.price - a.price);
            const sells = orders.filter((order: Order) => order.side === "sell").sort((a, b) => a.price - b.price);

            const highestBuy = buys[0];
            const lowestSell = sells[0];

            if (!highestBuy || !lowestSell || highestBuy.price < lowestSell.price) break;
            const fillQuanity = Math.min(highestBuy.getAvailableQuantity(), lowestSell.getAvailableQuantity());
            const fillPrice = (highestBuy.timestamp.getTime() > lowestSell.timestamp.getTime()) ? lowestSell.price : highestBuy.price;
            highestBuy.fill(fillQuanity, fillPrice);
            lowestSell.fill(fillQuanity, fillPrice);
            await this.orderRepository.update(highestBuy);
            await this.orderRepository.update(lowestSell);
        }
    }
}