import Order from "../../domain/Order";
import Registry, { inject } from "../../infra/di/Registry";
import Mediator from "../../infra/mediator/Mediator";
import AccountRepository from "../../infra/repository/AccountRepository";
import OrderRepository from "../../infra/repository/OrderRepository";

export default class PlaceOrder {
    @inject("accountRepository")
    private accountRepository!: AccountRepository;
    @inject("orderRepository")
    private orderRepository!: OrderRepository;
    @inject("mediator")
    private mediator!: Mediator;

    constructor() {
        this.accountRepository = Registry.getInstance().inject("accountRepository");
        this.orderRepository = Registry.getInstance().inject("orderRepository");
        this.mediator = Registry.getInstance().inject("mediator");
    }

    async execute(input: Input): Promise<Output> {
        // TODO: verificar o saldo
        // const account = await this.accountRepository.getById(input.accountId);
        const order = Order.create(input.accountId, input.marketId, input.side, input.quantity, input.price);
        await this.orderRepository.save(order);

        // Desacoplando UseCases - para um não chamar mais o outro diretamente, e sim se comunicarem através do Mediator
        // const executeOrder = new ExecuteOrder();
        // await executeOrder.execute(input.marketId);

        await this.mediator.notifyAll("orderPlaced", {marketId: input.marketId,orderId: order.orderId});
       
        return {
            orderId: order.orderId
        }
    }
}

type Input = {
    accountId: string;
    marketId: string;
    side: string;
    quantity: number;
    price: number;
}

type Output = {
    orderId: string;
}