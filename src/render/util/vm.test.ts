import {runInContext, safePointer, parseExpressString, compileValueExpress} from './vm';

describe('runInContext', () => {
    it('1 + 1 == 2', () => {
        let context = {
            result: 0
        };
        let ret = runInContext(`result = 1 + 1`, context);
        expect(ret).toBe(2);
        expect(context.result).toBe(2);
    });

    it('should throw ReferenceError', () => {
        let context = {};

        let ret = () => runInContext(`aaaaaa`, context);
        expect(ret).toThrow();
    });

    it('fib func call', () => {
        let context = {};
        let ret = runInContext(`(function() {
            function fib(n) {
                if (n < 2) {
                    return n;
                }
                
                return fib(n - 1) + fib(n - 2);
            }
            
            return fib(10);
        })()
        `, context);

        expect(ret).toBe(55);
    });

    it('get Object value through props', () => {
        let context = {
            $data: {
                name: {
                    age: 21
                }
            }
        };

        let ret = runInContext('$data.name.age', context);

        expect(ret).toBe(21);
    });

    it('Throw an error when get Object value which is unreachable', () => {
        let context = {
            $data: {
                name: {
                    age: 21
                }
            }
        };

        let ret = () => runInContext('$data.age.xx', context);

        expect(ret).toThrow();
    });
});

describe('safePointer', () => {
    it('return target if keys is empty', () => {
        let target = {
            name: 1
        };

        let ret = safePointer(target, []);

        expect(ret).toBe(ret);
    });

    it('return target if keys is not array', () => {
        let target = {
            name: 1
        };

        let ret = safePointer(target, null!);

        expect(ret).toBe(ret);
    });

    it('target.name == 1', () => {
        let target = {
            name: 1
        };

        let ret = safePointer(target, ['name']);

        expect(ret).toBe(1);
    });

    it('should return null when access unknown props', () => {
        let target = {
            name: 1
        };

        let ret = safePointer(target, ['age']);

        expect(ret).toBe(null);
    });

    it('work correct with nested keys', () => {
        let target = {
            age: {
                name: 1
            }
        };

        let ret = safePointer(target, ['age', 'name']);

        expect(ret).toBe(1);
    });

    it('work correct with arrays', () => {
        let target = {
            list: [1, 2, 3, 4, 5]
        };

        let ret = safePointer(target, ['list', 0]);

        expect(ret).toBe(1);
    });

    it('work correct with nest object and arrays', () => {
        let target = {
            list: [{
                name: {
                    age: 2
                }
            }]
        };

        let ret = safePointer(target, ['list', 0, 'name', 'age']);

        expect(ret).toBe(2);
    });
});

describe('parseExpressString', () => {
    it('#ES{1 + 1}', () => {
        let context = {};
        let ret = parseExpressString('#ES{1 + 1}', context);
        expect(ret).toBe(2);
    });

    it('#ES{1} + #ES{2}', () => {
        let context = {};
        let ret = parseExpressString('#ES{1} + #ES{2}', context);
        expect(ret).toBe(3);
    });

    it('#ES{"1"} + #ES{1}', () => {
        let context = {};
        let ret = parseExpressString('#ES{"1"} + #ES{1}', context);
        expect(ret).toBe('11');
    });

    it('#ES{1}es', () => {
        let context = {};
        let ret = parseExpressString('#ES{1}es', context);
        expect(ret).toBe('1es');
    });

    it('#ES{[1,2,3,4][0]}', () => {
        let context = {};
        let ret = parseExpressString('#ES{[1,2,3,4][0]}', context);
        expect(ret).toBe(1);
    });

    it('#ES{[1,"2",3,4][1]}', () => {
        let context = {};
        let ret = parseExpressString('#ES{[1,"2",3,4][1]}', context);
        expect(ret).toBe('2');
    });

    it('#ES{{name: 1}}["name"]', () => {
        let context = {};
        let ret = parseExpressString('#ES{{name: 1}}["name"]', context);
        expect(ret).toBe(1);
    });

    it('#ES{$data}', () => {
        let context = {
            $data: {
                name: 1
            }
        };

        let ret = parseExpressString('#ES{$data}', context);
        expect(JSON.stringify(ret)).toBe('{"name":1}');
    });

    it('#ES{$data["$data"]}', () => {
        let context = {
            $data: {
                name: 1
            }
        };

        let ret = parseExpressString('#ES{$data["$data"]}', context);
        expect(ret).toBe('');
    });

    it('#ES{$data["name"]}', () => {
        let context = {
            $data: {
                name: 1
            }
        };

        let ret = parseExpressString('#ES{$data["name"]}', context);
        expect(ret).toBe(1);
    });

    it('#ES{{arr: [{name: 1}, {name: 2}]}["arr"]}', () => {
        let context = {
            arr: [
                {
                    name: 1
                },
                {
                    name: 2
                }
            ]
        };

        let ret = parseExpressString('#ES{arr[0]}', context);
        expect(JSON.stringify(ret)).toBe(JSON.stringify(context.arr[0]));
    });

    it('#ES{$data[0]["name"][1]["age"]}', () => {
        let context = {
            $data: [
                {
                    name: [
                        {},
                        {
                            age: 10
                        }
                    ]
                }
            ]
        };

        let ret = parseExpressString('#ES{$data[0]["name"][1]["age"]}', context);
        expect(ret).toBe(10);
    });

    it('#ES{1 + (function(){ return 1})()}', () => {
        let context = {};
        let ret = parseExpressString('#ES{1 + (function(){ return 1})()}', context);
        expect(ret).toBe(2);
    });

    it(`#ES{1 + (function(){
        function add(a, b) {
            return a + b;
        }
    
        return add(1, 2) + add(3, 4)
    })()}`, () => {
        let context = {};
        let ret = parseExpressString(`#ES{1 + (function(){
        function add(a, b) {
            return a + b;
        }
    
        return add(1, 2) + add(3, 4)
    })()}`, context);
        expect(ret).toBe(11);
    });
});

describe('compileValueExpress', () => {
    it('{name: "#ES{1 + 1}"}', () => {
        let info = {
            name: '#ES{1 + 1}'
        };

        let ret = compileValueExpress(info, {});
        expect(typeof ret).toBe('object');
        expect(ret.name).toBe(2);
    });

    it('{$data: [{name: 1}, {name: 2}]}', () => {
        let context = {
            $data: [
                {
                    name: 1
                },
                {
                    name: 2
                }
            ],
            arr: [1, 2, 3]
        };

        let ret = compileValueExpress({
            result: '#ES{$data}',
            data: '#ES{$data}'
        }, context);


        expect(JSON.stringify(ret)).toBe(JSON.stringify({result: context.$data, data: context.$data}));
    });

    it('nest compiled', () => {
        let context = {
            '$data': {
                'name': 'test',
                'columns': [{'title': '姓名', 'dataIndex': 'name'}, {'title': '年龄', 'dataIndex': 'age'}],
                'dataSource': [{'name': 'andycall', 'age': 21}, {
                    'name': 'dongtiancheng',
                    'age': 21
                }, {'name': 'dongtiancheng', 'age': 21}]
            },
            '$query': {},
            '$global': {'pageId': '4567', 'username': 'dongtiancheng', 'proxy': 'http://localhost:8800/proxy'}
        };

        let info = {
            'type': 'table',
            'columns': '#ES{$data.columns}',
            'dataSource': '#ES{$data.dataSource}',
            'columnControls': [{
                'title': '下来框',
                'dataIndex': 'dropdown',
                'controls': [{'type': 'text', 'text': 'text'}, {'type': 'text', 'text': 'text'}]
            }]
        };
        
        let ret = compileValueExpress(info, context);
        
        console.log(ret);
    });
});