export function parseObjectPropertyExpress(preDefine: string, code: string, mirror: Object): any {
    // TODO safe run context;
    try {
        let f = new Function(preDefine, `return ${code}`);
        return f(mirror);
    } catch (e) {
        // TODO better error report
        // console.error('got unexpected error');
    }
}