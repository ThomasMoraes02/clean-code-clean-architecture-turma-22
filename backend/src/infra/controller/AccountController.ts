import HttpServer from "../http/HttpServer";
import Registry, { inject } from "../di/Registry";
import Signup from "../../application/usecase/Signup";
import GetAccount from "../../application/usecase/GetAccount";

/**
 * Controller para contas. Ele é responsável por definir as rotas relacionadas a contas e delegar as requisições para o serviço de contas. Note que ele utiliza o Registry para injetar as dependências necessárias (o serviço de contas e o servidor HTTP), o que permite que seja facilmente testado e mantido.
 */
export default class AccountController {
    @inject("httpServer")
    httpServer!: HttpServer;
    @inject("signup")
    signup!: Signup;
    @inject("getAccount")
    getAccount!: GetAccount;

    constructor() {
        this.httpServer = Registry.getInstance().inject("httpServer");
        this.signup = Registry.getInstance().inject("signup");
        this.getAccount = Registry.getInstance().inject("getAccount");

        this.httpServer.route("post", "/signup", async (params: any, body: any) => {
            return await this.signup.execute(body);
        });

        this.httpServer.route("get", "/accounts/:accountId", async (params: any, body: any) => {
            return await this.getAccount.execute(params.accountId);
        });
    }
}