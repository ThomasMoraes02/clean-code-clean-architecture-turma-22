import Registry from './infra/di/Registry';
import PgPromiseAdapter from './infra/database/DatabaseConnection';
import ExpressAdapter from './infra/http/HttpServer';
import AccountController from './infra/controller/AccountController';
import AccountRepositoryDatabase from './infra/repository/AccountRepository';
import { AccountDAODatabase } from './infra/dao/AccountDAO';
import { AccountAssetDAODatabase } from './infra/dao/AccountAssetDAO';
import Signup from './application/usecase/Signup';
import GetAccount from './application/usecase/GetAccount';

/**
 * Entrypoint da aplicação. Registra as dependências e inicia o servidor HTTP.
 * 
 * O Registry é utilizado para registrar as dependências da aplicação e injetá-las nas classes que precisam delas.
 * O HttpServer é iniciado e as rotas são definidas no AccountController.
 */
async function main() {
    const httpServer = new ExpressAdapter();
    Registry.getInstance().provide("DatabaseConnection", new PgPromiseAdapter());
    Registry.getInstance().provide("accountDAO", new AccountDAODatabase());
    Registry.getInstance().provide("accountAssetDAO", new AccountAssetDAODatabase());
    Registry.getInstance().provide("accountRepository", new AccountRepositoryDatabase());
    Registry.getInstance().provide("httpServer", httpServer);
    Registry.getInstance().provide("signup", new Signup());
    Registry.getInstance().provide("getAccount", new GetAccount());
    new AccountController();

    httpServer.listen(3000);
}

main();