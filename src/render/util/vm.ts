export function parseObjectPropertyExpress(code: string, mirror: Object): any {
    // TODO safe run context;
    try {
        let f = new Function('$response', `return ${code}`);
        return f(mirror);
    } catch (e) {
        console.error(e);
    }
}