import ExecuteOrder from "../../application/usecase/ExecuteOrder";
import Book from "../../domain/Book";
import Registry, { inject } from "../di/Registry";
import Mediator from "../mediator/Mediator";
import OrderRepository from "../repository/OrderRepository";

export default interface OrderHandler {
    handle(): void;
}

export class OrderHandlerBook implements OrderHandler {
    @inject("mediator")
    mediator!: Mediator;
    @inject("book")
    book!: Book;
    @inject("orderRepository")
    orderRepository!: OrderRepository;

    constructor() {
        this.mediator = Registry.getInstance().inject("mediator");
        this.book = Registry.getInstance().inject("book");
        this.orderRepository = Registry.getInstance().inject("orderRepository");
    }

    handle(): void {
        this.mediator.register("orderPlaced", async (order: any) => {
            await this.book.insert(order);
        });
        this.mediator.register("orderFilled", async (order: any) => {
            await this.orderRepository.update(order);
        });
    }
}

export class OrderHandlerExecuteOrder implements OrderHandler {
    @inject("mediator")
    mediator!: Mediator;
    @inject("executeOrder")
    executeOrder!: ExecuteOrder;

    constructor() {
        this.mediator = Registry.getInstance().inject("mediator");
        this.executeOrder = Registry.getInstance().inject("executeOrder");
    }

    handle(): void {
        this.mediator.register("orderPlaced", async (order: any) => {
            await this.executeOrder.execute(order.marketId);
        });
    }
}