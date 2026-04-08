/**
 * Registry é uma classe singleton que armazena as dependências da aplicação.
 * Ela possui um método provide para registrar as dependências e um método inject para injetar as dependências.
 * O método inject é utilizado pelo decorator @inject para injetar as dependências nas classes.
 * O nome da dependência deve ser o mesmo utilizado no método provide do Registry.
 * 
 * Exemplo de uso:
 * 
 * // Registro das dependências
 * const accountDao = new AccountDAODatabase();
 * Registry.getInstance().provide("accountDAO", accountDao);
 */
export default class Registry {
    dependencies: { [name: string]: any } = {};
    static instance: Registry;

    private constructor() {}


    provide(name: string, dependency: any): void {
        this.dependencies[name] = dependency;
    }

    inject(name: string): any {
        const dependency = this.dependencies[name];
        if (!dependency) throw new Error(`Dependency ${name} not found`);
        return dependency;
    }

    static getInstance(): Registry {
        if (!Registry.instance) {
            Registry.instance = new Registry();
        }
        return Registry.instance;
    }
}

/**
 * Decorator para injetar dependências usando getter dinâmico.
 * Permite acessar a dependência diretamente pela propriedade decorada.
 *
 * Exemplo de uso:
 *   @inject("DatabaseConnection")
 *   connection!: DatabaseConnection;
 */
export function inject(name: string) {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                return Registry.getInstance().inject(name);
            },
            enumerable: true,
            configurable: true
        });
    }
}