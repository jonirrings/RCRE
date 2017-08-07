import AntButton, {AntButtonProps} from './components/Button/index';
import {ComponentLoader} from '../../render/util/componentLoader';

let loader = new ComponentLoader();

loader.addComponent('button', AntButton, AntButtonProps);

export default loader;