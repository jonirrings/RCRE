import {BasicAsyncProviderInterface, BasicSyncProviderInterface} from './Controller';
import {Map} from 'immutable';

export class ProviderLoader {
    private providerMap: Map<string, {
        provider: BasicAsyncProviderInterface & BasicSyncProviderInterface;
        async: boolean;
    }>;
    
    constructor() {
        this.providerMap = Map({});
    }
    
    public registerProvider(
        mode: string, 
        provider: BasicAsyncProviderInterface & BasicSyncProviderInterface, 
        async: boolean
    ) {
        if (this.providerMap.has(mode)) {
            throw new Error('find exist provider of mode:' + mode);
        }
        
        this.providerMap = this.providerMap.set(mode, {
            provider,
            async
        });
    }
    
    public getTargetProvider(mode: string) {
        return this.providerMap.get(mode);
    }
}

export const providerLoaderInstance = new ProviderLoader();