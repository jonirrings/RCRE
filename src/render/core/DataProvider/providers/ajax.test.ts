import {AjaxDataProvider, AjaxProviderSourceConfig} from './ajax';
import {ContainerProps} from '../../Container/types';
import {actionCreators} from '../../Container/action';
import {Map} from 'immutable';
import {DataCustomer} from '../../DataCustomer/Controller';

describe('AjaxDataProvider', () => {
    let containerProps: ContainerProps;
    let config: AjaxProviderSourceConfig;
    beforeEach(() => {
        containerProps = {
            info: {
                type: 'none',
                model: 'none',
                children: []
            },
            $data: Map({}),
            $parent: Map({}),
            dataCustomer: new DataCustomer(),
            model: 'none',
            setData: actionCreators.setData,
            setDataList: actionCreators.setDataList,
            removeData: actionCreators.removeData,
            asyncLoadDataProgress: actionCreators.asyncLoadDataProgress,
            asyncLoadDataSuccess: actionCreators.asyncLoadDataSuccess,
            asyncLoadDataFail: actionCreators.asyncLoadDataFail,
            syncLoadDataSuccess: actionCreators.syncLoadDataSuccess,
            syncLoadDataFail: actionCreators.syncLoadDataFail
        };

        config = {
            mode: 'ajax',
            config: {
                url: 'http://cp01-rdqa-dev420-dongtiancheng.epc.baidu.com:8899/',
                method: 'GET',
                data: {
                    name: '#ES{$data.name}',
                    age: 1,
                    arr: [
                        {
                            name: '#ES{$data.name}',
                            age: 2
                        },
                        {
                            name: '#ES{$data.name} + #ES{$data.name}',
                            age: 2
                        }
                    ]
                }
            }
        };
    });
    
    it('configCheck', () => {

        let oldError = console.error;
        console.error = () => {};
        
        let provider = new AjaxDataProvider();
        expect(provider.configCheck(config)).toBe(true);
        let nil: any = null;
        let noUrl = {
            mode: 'ajax',
            config: {}
        };
        expect(provider.configCheck(nil)).toBe(false);
        expect(provider.configCheck(noUrl)).toBe(false);
        
        console.error = oldError;
    });
    
    it('parse', () => {
        let provider = new AjaxDataProvider();
        containerProps.$data = Map({name: 'andycall'});
        
        let ret = provider.parse(config, containerProps, {});
        
        expect(ret.config.data.name).toBe('andycall');
        expect(ret.config.data.age).toBe(1);
        expect(ret.config.data.arr.length).toBe(2);
        expect(ret.config.data.arr[0].name).toBe('andycall');
        expect(ret.config.data.arr[1].name).toBe('andycallandycall');
    });
    
    it('run', () => {
        // let provider = new AjaxDataProvider();
        // containerProps.$data = Map({name: 'andycall'});
        // let parsed = provider.parse(config, containerProps, {});
        // // let ret = provider.run(parsed);
        //
        // console.log(ret);
    });
});