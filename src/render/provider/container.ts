class ContainerObject {
    /**
     * Container 类型
     */
    type: string;

    /**
     * Container label
     */
    label: string;
}

export type ContainerInterface = ContainerObject | ContainerObject[] | string;