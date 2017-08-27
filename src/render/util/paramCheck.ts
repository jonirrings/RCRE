import {validateSync, ValidationError} from 'class-validator';

export default function paramCheck(info: any, validateClass: any): ValidationError[] {
    let validateObj = new validateClass();
    Object.assign(validateObj, info);
    
    return validateSync(validateObj, {
        skipMissingProperties: true
    });
}