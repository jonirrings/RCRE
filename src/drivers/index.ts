import AntTheme from './antd/index';
import { ComponentLoader } from '../render/util/componentLoader';

export class DriverController {
    private themeMap: Map<string, ComponentLoader>;
    private lastValidTheme: any;

    constructor() {
        this.themeMap = new Map();
        this.setTheme('antd', AntTheme);
    }

    getTheme(theme: string): ComponentLoader {
        let item = this.themeMap.get(theme);

        if (!item) {
            console.error('there is not theme type, val: ' + theme);
            return this.lastValidTheme;
        }

        return item;
    }

    setTheme(theme: string, loader: ComponentLoader) {
        this.themeMap.set(theme, loader);
        this.lastValidTheme = loader;
    }
}

let driver = new DriverController();

export default driver;