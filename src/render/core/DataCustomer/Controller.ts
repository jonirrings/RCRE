import {customerLoaderInstance} from './loader';
import {PassCustomers} from './customers/pass';
import {Map} from 'immutable';
import {runTimeType} from '../Container/types';

customerLoaderInstance.registerCustomer('pass', new PassCustomers());

export class CustomerSourceConfig {
    /**
     * customer类型
     */
    mode: string;

    /**
     * 不同customer需要的配置数据
     */
    config: any;

    /**
     * customer的
     */
    name: string;
}

export interface CustomerItem {
    /**
     * customer执行模式
     */
    mode: string;

    /**
     * customer名称
     */
    name: string;

    /**
     * customer配置
     */
    config: any;
}

export interface CustomerGroup {
    /**
     * 组合名称
     */
    name: string;

    /**
     * 执行顺序
     */
    steps: string[];
}

export interface CustomerSourceConfig {
    /**
     * 单个customer配置
     */
    customers: CustomerItem[];

    /**
     * 业务组合
     */
    groups: CustomerGroup[];
}

export interface BasicCustomerInstance {
    exec(config: any, runTime: runTimeType): Promise<void>;
}

/**
 * DataCustomer是一个数据源输出端
 * 它通过注入customer插件的形式, 把各种各样的数据消耗方加载进来
 * 针对特殊的业务逻辑场景, 可以使用Group来使用链式调用
 */
export class DataCustomer {
    private customers: Map<string, {
        instance: BasicCustomerInstance;
        config: any;
    }>;

    private groups: Map<string, string[]>;

    constructor() {
        this.customers = Map({});
        this.groups = Map({});
    }

    public initCustomerConfig(info: CustomerSourceConfig | CustomerSourceConfig[]) {
        if (info instanceof Array) {
            info.forEach(item => this.initCustomer(item));
        } else {
            this.initCustomer(info);
        }
    }

    private initCustomer(info: CustomerSourceConfig) {
        let customerList = info.customers;
        let groups = info.groups;

        customerList.forEach(customer => {
            let mode = customer.mode;
            let name = customer.name;
            let config = customer.config;

            let instance = customerLoaderInstance.getCustomer(mode);

            if (!instance) {
                console.error('can not find customer of mode: ' + mode);
                return;
            }

            this.customers = this.customers.set(name, {
                instance: instance,
                config: config
            });
        });

        groups.forEach(group => {
            let name = group.name;
            let steps = group.steps;

            this.groups = this.groups.set(name, steps);
        });
    }

    public async execCustomer(customer: string, runTime: runTimeType) {
        if (!this.customers.has(customer)) {
            console.error(`customer: ${customer} is not defined`);
            return;
        }
        
        if (!this.groups.has(customer)) {
            let instance = this.customers.get(customer).instance;
            let config = this.customers.get(customer).config;
            
            await instance.exec(config, runTime);
        } else {
            let groups = this.groups.get(customer);
            
            for (let name of groups) {
                if (!this.customers.has(name)) {
                    console.log(`customer: ${name} is not defined`);
                    continue;
                }
                
                let instance = this.customers.get(name).instance;
                let config = this.customers.get(name).config;
                
                await instance.exec(config, runTime);
            }
        }
    }
}