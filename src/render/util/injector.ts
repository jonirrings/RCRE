import {originJSONType} from '../core/Container/types';
import { each, isPlainObject } from 'lodash';

class ParamsInjector {
    private originObject: Object;
    private resourceProvider: () => Promise<any>;
    private finishedCallback: () => any;
    private $resource: Object;

    static isInjector(item: originJSONType): boolean {
        return false;
    }

    constructor(originObject: Object, resourceProvider: () => Promise<any>) {
        this.originObject = originObject;

        resourceProvider().then((ret) => {
            this.$resource = ret;
            
            this.parseObjItem(this.originObject, this.$resource);
        });
    }

    setResourceProvider(resource: () => Promise<any>) {
        this.resourceProvider = resource;
    }

    finished(done: () => void) {
        this.finishedCallback = done;
    }

    private getDataThroughPath(path: string, origin: Object) {
        let paths = path.split('.').slice(1);
        // let target = null;
        
        while (paths.length > 0) {
            let nextPosition = paths.shift();
            let nextVal = origin[nextPosition];
        }
    }
    
    private parseObjItem(origin: Object, mirror: Object) {
        each(origin, (val, key) => {
            if (isPlainObject(val)) {
                this.parseObjItem(val, mirror);
                return;
            }
            
            if (val.indexOf('$response') === 0) {
                this.getDataThroughPath(val, mirror);
            }
        });
    }
}

export default ParamsInjector;