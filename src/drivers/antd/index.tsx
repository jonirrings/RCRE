import {ComponentLoader} from '../../render/util/componentLoader';
import AntButton from './components/Button/Button';
import AntTree from './components/Tree/Tree';
import AntTreeNode from './components/Tree/TreeNode';
import { ButtonPropsInterface } from '../../abstractComponents/Button/Button';
import { TreePropsInterface } from '../../abstractComponents/Tree/Tree';
import { TreeNodePropsInterface } from '../../abstractComponents/Tree/TreeNode';

let loader = new ComponentLoader();
loader.addComponent<ButtonPropsInterface>('button', AntButton, ButtonPropsInterface);
loader.addComponent<TreePropsInterface>('tree', AntTree, TreePropsInterface);
loader.addComponent<TreeNodePropsInterface>('treeNode', AntTreeNode, TreeNodePropsInterface);

export default loader;