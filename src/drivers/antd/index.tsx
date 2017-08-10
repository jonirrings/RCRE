import AntButton from './components/Button/index';
import { ButtonPropsInterface } from '../../abstractComponents/Button/Button';
import {ComponentLoader} from '../../render/util/componentLoader';

let loader = new ComponentLoader();
loader.addComponent<ButtonPropsInterface>('button', AntButton, ButtonPropsInterface);

export default loader;