import { validateSync } from 'class-validator';

export default function paramCheck(info: any, validateClass: any) {
    let validateObj = new validateClass();
    Object.assign(validateObj, info);
    
    return validateSync(validateObj, {
        skipMissingProperties: true
    });
}