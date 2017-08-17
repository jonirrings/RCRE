import AntButton from './components/Button/Button';
import AntTree from './components/Tree/Tree';
import AntTreeNode from './components/Tree/TreeNode';
import AntInput from './components/Input/Input';
import {ButtonPropsInterface} from '../../abstractComponents/Button/Button';
import {TreePropsInterface} from '../../abstractComponents/Tree/Tree';
import {TreeNodePropsInterface} from '../../abstractComponents/Tree/TreeNode';
import {InputPropsInterface} from '../../abstractComponents/Form/FormItem/Input/Input';

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
    }
};