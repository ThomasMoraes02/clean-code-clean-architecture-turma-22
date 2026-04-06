import Registry, { inject } from "../../infra/di/Registry";
import OrderRepository from "../../infra/repository/OrderRepository";

export default class GetOrder {
    @inject("orderRepository")
    orderRepository!: OrderRepository;

    constructor() {
        this.orderRepository = Registry.getInstance().inject("orderRepository");
    }

    async execute(orderId: string): Promise<Output> {
        const order = await this.orderRepository.getById(orderId);
        return order;
    }
}

type Output = {
    orderId: string;
    accountId: string;
    marketId: string;
    side: string;
    quantity: number;
    price: number;
}