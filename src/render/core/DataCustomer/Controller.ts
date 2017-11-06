import {customerInstance} from './loader';
import {Map} from 'immutable';

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
    exec(config: CustomerSourceConfig): Promise<void>;
}

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

    public execCustomer(customer: string) {
        console.log(customer, this.groups, this.customers);
    }

    private initCustomer(info: CustomerSourceConfig) {
        let customerList = info.customers;
        let groups = info.groups;

        customerList.forEach(customer => {
            let mode = customer.mode;
            let name = customer.name;
            let config = customer.config;

            let instance = customerInstance.getCustomer(mode);

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
}