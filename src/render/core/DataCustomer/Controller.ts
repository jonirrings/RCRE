import {customerLoaderInstance} from './loader';
import {PassCustomers} from './customers/pass';
import {SubmitCustomer} from './customers/submit';
import {Map} from 'immutable';
import {runTimeType} from '../Container/types';

customerLoaderInstance.registerCustomer('pass', new PassCustomers());
customerLoaderInstance.registerCustomer('submit', new SubmitCustomer());

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
    exec(config: any, runTime: runTimeType, model: string, customer: string): Promise<any>;
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
        } else if (info && info.customers) {
            this.initCustomer(info);
        }
    }

    public getGroups() {
        return this.groups;
    }

    public async execCustomer(customer: string, runTime: runTimeType, model: string) {
        if (!this.customers.has(customer)) {
            console.error(`customer: ${customer} is not defined`);
            return;
        }

        let instance = this.customers.get(customer).instance;
        let config = this.customers.get(customer).config;

        await instance.exec(config, runTime, model, customer);
    }

    private initCustomer(info: CustomerSourceConfig) {
        let customers = info.customers;
        let groups = info.groups;

        if (!(customers instanceof Array)) {
            console.error('customers should be array');
            return;
        }

        customers.forEach(customer => {
            if (!customer.mode) {
                console.error('mode property is required for single customer');
                return;
            }

            if (!customer.name) {
                console.error('name property is required for single customer');
                return;
            }
            
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
        
        if (groups instanceof Array) {
            groups.forEach(group => {
                if (!group.name) {
                    console.error('name property is required for group');
                    return;
                }

                if (!group.steps || !Array.isArray(group.steps)) {
                    console.error('steps property is required and it\'s an array type');
                    return;
                }
                
                let name = group.name;
                let steps = group.steps;

                this.groups = this.groups.set(name, steps);
            });   
        }
    }
}