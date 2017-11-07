import {InitDataProvider} from './init';
import {Map} from 'immutable';
import {ContainerProps} from '../../Container/types';
import {actionCreators} from '../../Container/action';
import {DataCustomer} from '../../DataCustomer/Controller';

describe('InitDataProvider', () => {
    let containerProps: ContainerProps;
    beforeEach(() => {
        containerProps = {
            info: {
                type: 'none',
                model: 'test',
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
    });

    it('parse', () => {
        let dataProvider = new InitDataProvider();
        let config = {
            mode: 'init',
            config: {
                name: 1,
                age: '#ES{$data.name}'
            }
        };

        let ret = dataProvider.parse(config, containerProps, {});

        expect(ret.config.name).toBe(1);
        expect(ret.config.age).toBe(1);
    });

    it('retCheck', () => {
        let dataProvider = new InitDataProvider();
        let config = {
            mode: 'init',
            config: {
                name: 1,
                age: '#ES{$data.name}'
            }
        };

        let parsed = dataProvider.parse(config, containerProps, {});
        let ret = dataProvider.run(parsed);
        let check = dataProvider.retCheck(ret, config);

        expect(check).toBe(true);

        let badRet: any = null;
        let badCheck = dataProvider.retCheck(badRet, config);
        expect(badCheck).toBe(false);
    });

    it('retParse', () => {
        let dataProvider = new InitDataProvider();
        let config = {
            mode: 'init',
            config: {
                name: 1,
                age: '#ES{$data.name}'
            }
        };

        let parsed = dataProvider.parse(config, containerProps, {});
        let ret = dataProvider.run(parsed);
        let check = dataProvider.retCheck(ret, config);

        expect(check).toBe(true);

        let parseRet = dataProvider.retParse(ret, config, containerProps, {});
        expect(parseRet).toBe(ret);
    });

    it('run', () => {
        let dataProvider = new InitDataProvider();
        let config = {
            mode: 'init',
            config: {
                name: 1,
                age: '#ES{$data.name}'
            }
        };

        let ret = dataProvider.parse(config, containerProps, {});
        let check = dataProvider.retCheck(ret, config);

        expect(check).toBe(true);

        let parsed = dataProvider.retParse(ret, config, containerProps, {});
        expect(parsed).toBe(ret);

        let run: any = dataProvider.run(config);
        expect(run.name).toBe(1);
        expect(run.age).toBe(1);
    });
});