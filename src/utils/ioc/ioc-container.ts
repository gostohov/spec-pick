import "reflect-metadata";
import { Container } from "inversify";
import { SERVICE_IDENTIFIER, SpecListCheckService } from "../../services";

class IoCContainer {
    private _container: Container;

    constructor() {
        this._container = new Container();
        this._container.bind<SpecListCheckService>(SERVICE_IDENTIFIER.SpecListCheckService).to(SpecListCheckService);
    }

    get container(): Container {
        return this._container;
    }

    get<T>(serviceIdentifier: symbol): any {
        return this.container.get(serviceIdentifier);
    }
}

export const iocContainer = new IoCContainer();