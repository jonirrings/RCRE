import AntButton from './components/Button/Button';
import AntTree from './components/Tree/Tree';
import AntTreeNode from './components/Tree/TreeNode';
import AntInput from './components/Input/Input';
import AntSelect from './components/Select/Select';
import AntCheckbox from './components/Checkbox/Checkbox';
import AntRadio from './components/Radio/Radio';
import AntBreadcrumb from './components/Breadcrumb/Breadcrumb';
import AntTable from './components/Table/Table';
import AntDatepicker from './components/Datepicker/Datepicker';
import AntText from './components/Text/Text';
import {ButtonPropsInterface} from '../../abstractComponents/Button/Button';
import {TreePropsInterface} from '../../abstractComponents/Tree/Tree';
import {TreeNodePropsInterface} from '../../abstractComponents/Tree/TreeNode';
import {InputPropsInterface} from '../../abstractComponents/Input/Input';
import {SelectPropsInterface} from '../../abstractComponents/Select/Select';
import {CheckboxPropsInterface} from '../../abstractComponents/Checkbox/Checkbox';
import {RadioPropsInterface} from '../../abstractComponents/Radio/Radio';
import {BreadcrumbPropsInterface} from '../../abstractComponents/Breadcrumb/Breadcrumb';
import {TablePropsInterface} from '../../abstractComponents/Table/Table';
import {DatePickerPropsInterface} from '../../abstractComponents/Datepicker/Datepicker';
import AntForm from './components/Form/Form';
import {FormPropsInterface} from '../../abstractComponents/Form/Form';
import {TextPropsInterface} from '../../abstractComponents/Plain/Text';

export default {
    button: {
        component: AntButton,
        componentInterface: ButtonPropsInterface
    },
    tree: {
        component: AntTree,
        componentInterface: TreePropsInterface
    },
    treeNode: {
        component: AntTreeNode,
        componentInterface: TreeNodePropsInterface
    },
    input: {
        component: AntInput,
        componentInterface: InputPropsInterface
    },
    form: {
        component: AntForm,
        componentInterface: FormPropsInterface
    },
    select: {
        component: AntSelect,
        componentInterface: SelectPropsInterface
    },
    checkbox: {
        component: AntCheckbox,
        componentInterface: CheckboxPropsInterface
    },
    radio: {
        component: AntRadio,
        componentInterface: RadioPropsInterface
    },
    breadcrumb: {
        component: AntBreadcrumb,
        componentInterface: BreadcrumbPropsInterface
    },
    table: {
        component: AntTable,
        componentInterface: TablePropsInterface
    },
    datepicker: {
        component: AntDatepicker,
        componentInterface: DatePickerPropsInterface
    },
    text: {
        component: AntText,
        componentInterface: TextPropsInterface
    }
};