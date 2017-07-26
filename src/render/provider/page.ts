import { ContainerInterface } from './container';

class PageObject {
    /**
     * @default page
     * @desc 渲染器的类型是page 
     */
    type: 'page';

    /**
     * @desc 标题
     */
    title: string;

    /**
     * @desc 容器
     */
    body: ContainerInterface[];
}

export type PageInterface = PageObject; 