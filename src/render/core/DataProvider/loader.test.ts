import {providerLoaderInstance} from './loader';
import {AjaxDataProvider} from './providers/ajax';

describe('DataProvider Loader', () => {
     it('register async Provider', () => {
         let instance = new AjaxDataProvider();
         providerLoaderInstance.registerProvider('test', instance, true);

         expect(typeof providerLoaderInstance.getTargetProvider('test')).toBe('object');
         expect(providerLoaderInstance.getTargetProvider('test').async).toBe(true);
         expect(providerLoaderInstance.getTargetProvider('test').provider).toBe(instance);
     });
});