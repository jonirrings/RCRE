import {runInContext, safePointer} from './vm';

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