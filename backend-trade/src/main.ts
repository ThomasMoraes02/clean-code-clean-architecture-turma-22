import Book from './domain/Book';
import Order from './domain/Order';
import Registry from './infra/di/Registry';
import { AxiosAdapter } from './infra/http/HttpClient';
import ExpressAdapter from './infra/http/HttpServer';
import MediatorMemory from './infra/mediator/Mediator';
import RabbitMQAdapter from './infra/queue/Queue';

async function main() {
    const httpServer = new ExpressAdapter();
    const httpClient = new AxiosAdapter();
    
    const queue = new RabbitMQAdapter();
    await queue.connect();
    await queue.setup("orderPlaced", "orderPlaced.executeOrder");
    await queue.setup("orderFilled", "orderFilled.updateOrder");


    const mediator = new MediatorMemory();
    Registry.getInstance().provide("mediator", mediator);
    const book = new Book("BTC-USD");

    httpServer.route("post", "/execute_order", async (params: any, body: any) => {
        const input = body;
        const order = new Order(input.orderId, input.accountId, input.marketId, input.side, input.quantity, input.price, input.fillQuantity, input.fillPrice, input.status, new Date(input.timestamp));
        await book.insert(order);
    });

    queue.consume("orderPlaced.executeOrder", async (input: any) => {
        const order = new Order(input.orderId, input.accountId, input.marketId, input.side, input.quantity, input.price, input.fillQuantity, input.fillPrice, input.status, new Date(input.timestamp));
        await book.insert(order);
    });

    mediator.register("orderFilled", async (order: Order) => {
        await queue.publish("orderFilled", order);
    });

    httpServer.listen(3001);
}

main();