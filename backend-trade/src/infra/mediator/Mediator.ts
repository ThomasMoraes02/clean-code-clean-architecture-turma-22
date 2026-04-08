/**
 * O que é o padrão Mediator: é um padrão de design de software que define um objeto que encapsula a forma como os objetos interagem. Ele promove o acoplamento fraco ao evitar que os objetos se refiram explicitamente uns aos outros, permitindo que eles se comuniquem através do mediador.
 * 
 * No contexto de uma aplicação, o Mediator pode ser usado para coordenar a comunicação entre diferentes componentes, como serviços, controladores e repositórios. Ele pode ser implementado como uma classe que recebe as requisições dos controladores e delega a execução para os serviços correspondentes, além de lidar com a resposta e o tratamento de erros.
 * 
 * O uso do Mediator pode ajudar a manter o código mais organizado e modular, facilitando a manutenção e a escalabilidade da aplicação. Ele também pode ajudar a reduzir o acoplamento entre os componentes, tornando o código mais flexível e testável.
 */

export default interface Mediator {
    register(event: string, callback: Function): void;
    notifyAll(event: string, data: any): Promise<void>;
}

export default class MediatorMemory implements Mediator {
    handlers: { event: string, callback: Function }[] = [];

    register(event: string, callback: Function): void {
        this.handlers.push({ event, callback });
    }

    async notifyAll(event: string, data: any){
        for (const handler of this.handlers) {
            if (handler.event === event) {
                await handler.callback(data);
            }
        }
    }
}