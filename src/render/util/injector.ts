import { originJSONType } from '../core/Container/types';

class ParamsInjector {
    private originObject: Object;
    private resourceProvider: Promise<any>;
    private finishedCallback: () => any;
    static isInjector(item: originJSONType): boolean {
        return false;
    }
    
    constructor(originObject: Object) {
        this.originObject = originObject;
        
        setTimeout(() => {
            if (this.finishedCallback) {
                this.finishedCallback();
            }
        }, 500);
    }
    
    setResourceProvider(resource: Promise<any>) {
        this.resourceProvider = resource;
    }
    
    finished(done: () => void) {
        this.finishedCallback = done;
    }
    
    // public parseObjItem(obj: Object) {
    //                
    // }

}

export default ParamsInjector;