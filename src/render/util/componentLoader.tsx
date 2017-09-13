import * as React from 'react';
import Button, {ButtonPropsInterface} from '../../abstractComponents/Button/Button';
import Input, {InputPropsInterface} from '../../abstractComponents/Input/Input';
import Tree, {TreePropsInterface} from '../../abstractComponents/Tree/Tree';
import TreeNode, {TreeNodePropsInterface} from '../../abstractComponents/Tree/TreeNode';
import LineChart, {LineChartPropsInterface} from '../../abstractComponents/Chart/LineChart';
import Form, {FormPropsInterface} from '../../abstractComponents/Form/Form';
import Select, {SelectPropsInterface} from '../../abstractComponents/Select/Select';
import Checkbox, {CheckboxPropsInterface} from '../../abstractComponents/Checkbox/Checkbox';
import Radio, {RadioPropsInterface} from '../../abstractComponents/Radio/Radio';
import Breadcrumb, {BreadcrumbPropsInterface} from '../../abstractComponents/Breadcrumb/Breadcrumb';
import Table, {TablePropsInterface} from '../../abstractComponents/Table/Table';
import Datepicker, {DatePickerPropsInterface} from '../../abstractComponents/Datepicker/Datepicker';
import Html, {HtmlPropsInterface} from '../../abstractComponents/Plain/Html';
import Text, {TextPropsInterface} from '../../abstractComponents/Plain/Text';
import Container, {ContainerPropsInterface} from '../../abstractComponents/Container/Container';
import Row, {RowPropsInterface} from '../core/Layout/Row/Row';
import Layout, {LayoutPropsInterface} from '../core/Layout/Layout/Layout';
import Header, {HeaderPropsInterface} from '../core/Layout/Layout/Header';
import Sider, {SidePropsInterface} from '../core/Layout/Layout/Sider';
import Footer, {FooterPropsInterface} from '../core/Layout/Layout/Footer';
import Content, {ContentPropsInterface} from '../core/Layout/Layout/Content';
import List, {ListPropsInterface} from '../../abstractComponents/List/List';
import Hr, {HrPropsInterface} from '../../abstractComponents/Plain/Hr';
import PopConfirm, {PopConfirmPropsInterface} from '../../abstractComponents/PopConfirm/PopConfirm';
import * as _ from 'lodash';

export type ComponentLoaderMapVal = {
    component: React.ComponentClass<any>,
    componentInterface: Object
};

export class ComponentLoader {
    private cache: Map<string, ComponentLoaderMapVal>;

    constructor() {
        this.cache = new Map();
    }

    getAbstractComponent(type: string): ComponentLoaderMapVal | undefined {
        if (type.indexOf('.') >= 0) {
            type = type.split('.').slice(-1)[0];
        }
        
        return this.cache.get(type);
    }

    getDriverComponent(name: string, theme: string) {
        if (name.indexOf('.') >= 0) {
            theme = name.split('.')[0];
            name = name.split('.')[1];
        }

        return this.cache.get(`${theme}.${name}`);
    }

    addComponent(type: string, component: React.ComponentClass<any>, componentInterface: any) {
        this.cache.set(type, {
            component,
            componentInterface
        });
    }
}

const config = {
    button: {
        component: Button,
        componentInterface: ButtonPropsInterface
    },
    tree: {
        component: Tree,
        componentInterface: TreePropsInterface
    },
    treeNode: {
        component: TreeNode,
        componentInterface: TreeNodePropsInterface
    },
    lineChart: {
        component: LineChart,
        componentInterface: LineChartPropsInterface
    },
    row: {
        component: Row,
        componentInterface: RowPropsInterface
    },
    form: {
        component: Form,
        componentInterface: FormPropsInterface
    },
    input: {
        component: Input,
        componentInterface: InputPropsInterface
    },
    select: {
        component: Select,
        componentInterface: SelectPropsInterface
    },
    checkbox: {
        component: Checkbox,
        componentInterface: CheckboxPropsInterface
    },
    radio: {
        component: Radio,
        componentInterface: RadioPropsInterface
    },
    breadcrumb: {
        component: Breadcrumb,
        componentInterface: BreadcrumbPropsInterface
    },
    table: {
        component: Table,
        componentInterface: TablePropsInterface
    },
    datepicker: {
        component: Datepicker,
        componentInterface: DatePickerPropsInterface
    },
    html: {
        component: Html,
        componentInterface: HtmlPropsInterface
    },
    text: {
        component: Text,
        componentInterface: TextPropsInterface
    },
    layout: {
        component: Layout,
        componentInterface: LayoutPropsInterface
    },
    header: {
        component: Header,
        componentInterface: HeaderPropsInterface
    },
    sider: {
        component: Sider,
        componentInterface: SidePropsInterface
    },
    content: {
        component: Content,
        componentInterface: ContentPropsInterface
    },
    footer: {
        component: Footer,
        componentInterface: FooterPropsInterface
    },
    container: {
        component: Container,
        componentInterface: ContainerPropsInterface
    },
    list: {
        component: List,
        componentInterface: ListPropsInterface
    },
    hr: {
        component: Hr,
        componentInterface: HrPropsInterface
    },
    popConfirm: {
        component: PopConfirm,
        componentInterface: PopConfirmPropsInterface
    }
};

const loader = new ComponentLoader();

_.each(config, (info, name) => {
    let component = info.component;
    loader.addComponent(name, component, info.componentInterface);
});

export default loader;