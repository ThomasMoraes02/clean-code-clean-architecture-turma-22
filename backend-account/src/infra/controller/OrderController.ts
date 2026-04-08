import HttpServer from "../http/HttpServer";
import Registry, { inject } from "../di/Registry";
import PlaceOrder from "../../application/usecase/PlaceOrder";
import GetOrder from "../../application/usecase/GetOrder";
import GetDepth from "../../application/usecase/GetDepth";

/**
 * Controller para ordens. Ele é responsável por definir as rotas relacionadas a ordens e delegar as requisições para os casos de uso. Note que ele utiliza o Registry para injetar as dependências necessárias, o que permite que seja facilmente testado e mantido.
 */
export default class OrderController {
    @inject("httpServer")
    httpServer!: HttpServer;
    @inject("placeOrder")
    placeOrder!: PlaceOrder;
    @inject("getOrder")
    getOrder!: GetOrder;
    @inject("getDepth")
    getDepth!: GetDepth;

    constructor() {
        this.httpServer = Registry.getInstance().inject("httpServer");
        this.placeOrder = Registry.getInstance().inject("placeOrder");
        this.getOrder = Registry.getInstance().inject("getOrder");
        this.getDepth = Registry.getInstance().inject("getDepth");

        this.httpServer.route("post", "/place_order", async (params: any, body: any) => {
            return await this.placeOrder.execute(body);
        });

        this.httpServer.route("get", "/orders/:orderId", async (params: any, body: any) => {
            return await this.getOrder.execute(params.orderId);
        });

        this.httpServer.route("get", "/markets/:marketId/depth", async (params: any, body: any) => {
            return await this.getDepth.execute(params.marketId);
        });
    }
}
