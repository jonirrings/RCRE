import {providerLoaderInstance} from './loader';
import {AjaxDataProvider} from './providers/ajax';

describe('DataProvider Loader', () => {
     it('register async Provider', () => {
         let instance = new AjaxDataProvider();
         providerLoaderInstance.registerProvider('test', instance, true);
         
         expect(providerLoaderInstance.getTargetProvider('test')).toBe(instance);
     });
});