import AntButton from './components/Button/Button';
import AntTree from './components/Tree/Tree';
import AntTreeNode from './components/Tree/TreeNode';
import AntRow from './components/Row/Row';
import AntCol from './components/Col/Col';
import {ButtonPropsInterface} from '../../abstractComponents/Button/Button';
import {TreePropsInterface} from '../../abstractComponents/Tree/Tree';
import {TreeNodePropsInterface} from '../../abstractComponents/Tree/TreeNode';
import {RowPropsInterface} from '../../render/core/Layout/Row/Row';
import {ColPropsInterface} from '../../render/core/Layout/Col/Col';

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
    },
    col: {
        component: AntCol,
        componentInterface: ColPropsInterface
    }
};