import AntTheme from './antd/index';
import RcreTheme from './rcre/index';
import {ComponentLoader} from '../render/util/componentLoader';
import * as React from 'react';
import {each} from 'lodash';

export type ThemeConfig = {
    [s: string]: {
        component: React.ComponentClass<any>,
        componentInterface: Object
    }
};

export class DriverController {
    private theme: string;
    private loader: ComponentLoader;
    private registedTheme: Map<string, boolean>;

    constructor() {
        this.loader = new ComponentLoader();
        this.theme = 'antd';
        this.registedTheme = new Map();
    }

    public setTheme(theme: string) {
        if (!this.registedTheme.has(theme)) {
            // TODO better error report
            console.error('there are no registed themes');
            return;
        }

        this.theme = theme;
    }

    public registerTheme(theme: string, config: ThemeConfig) {
        this.registedTheme.set(theme, true);

        each(config, (info, name) => {
            if (!/^[\w0-9]+$/.test(name)) {
                console.error('invalid driver component name, name can only contains words and numbers');
                return;
            }

            this.loader.addComponent(`${theme}.${name}`, info.component, info.componentInterface);
        });
    }

    public getComponent(name: string) {
        return this.loader.getDriverComponent(name, this.theme);
    }
}

let driver = new DriverController();
driver.registerTheme('antd', AntTheme);
driver.registerTheme('rcre', RcreTheme);

export default driver;