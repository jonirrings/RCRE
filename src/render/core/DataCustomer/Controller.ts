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

export interface BasicCustomer {

}

export class DataCustomer {
    public execCustomer(customer: string) {
        console.log(customer);
    }
}