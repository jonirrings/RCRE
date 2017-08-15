import AntButton from './components/Button/Button';
import AntTree from './components/Tree/Tree';
import AntTreeNode from './components/Tree/TreeNode';
import AntRow from './components/Row/Row';
import {ButtonPropsInterface} from '../../abstractComponents/Button/Button';
import {TreePropsInterface} from '../../abstractComponents/Tree/Tree';
import {TreeNodePropsInterface} from '../../abstractComponents/Tree/TreeNode';
import {RowPropsInterface} from '../../abstractComponents/Row/Row';

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
    row: {
        component: AntRow,
        componentInterface: RowPropsInterface
    }
};