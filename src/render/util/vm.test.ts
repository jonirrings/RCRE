import {runInContext} from './vm';

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