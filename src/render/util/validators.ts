import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {BasicConfig} from '../core/Container/types';
import {map} from 'lodash';
import paramCheck from './paramCheck';

@ValidatorConstraint({
    name: 'IsPageInfo',
    async: false
})
export class IsPageInfo implements ValidatorConstraintInterface {
    private errmsg: string = '';

    validate(info: BasicConfig, args: ValidationArguments) {
        let errRet = paramCheck(info, BasicConfig);

        this.errmsg = errRet.map(err => {
            let constraints = err.constraints;
            return map(constraints, i => i).join('');
        }).join('\n');
        return errRet.length === 0;
    }

    defaultMessage() {
        return this.errmsg;
    }
}

@ValidatorConstraint({
    name: 'IsArrayString',
    async: false
})
export class IsArrayString implements ValidatorConstraintInterface {
    validate(value: string[], args: ValidationArguments) {
        if (!Array.isArray(value)) {
            return false;
        }
        
        return value.every(i => typeof i === 'string');
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return `${args.targetName} should the an array which every item's type is string`;
    }
}

@ValidatorConstraint({
    name: 'IsCheckedKeys',
    async: false
})
export class IsCheckedKeys implements ValidatorConstraintInterface {
    validate(value: string[] | { checked: string[], halfChecked: string[] }, args: ValidationArguments) {
        if (Array.isArray(value)) {
            return value.every(i => typeof i === 'string');
        }

        if (value.checked && value.halfChecked) {
            return value.checked.every(i => typeof i === 'string') &&
                value.halfChecked.every(i => typeof i === 'string');
        }

        return false;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.targetName} is not valide for string[] | { checked: string[], halfChecked: string[] }`;
    }
}

@ValidatorConstraint({
    name: 'IsValidEnums',
    async: false
})
export class IsValidEnums implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments) {
        let enums = args.constraints;
        return enums.indexOf(value) >= 0;
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.targetName} is not in ${args.constraints.join(',')}`;
    }
}

// @ValidatorConstraint({
//     name: 'UniversalValidators',
//     async: false
// })
// export class UniversalValidators implements ValidatorConstraintInterface {
//     validate(value: Object, args: ValidationArguments) {
//         let Validator = args.constraints[0];
//         let container = new Validator();
//         Object.assign(container, value);
//         return validateSync(container).length === 0;
//     }
//    
//     defaultMessage(args: ValidationArguments) {
//         return `${args.targetName} is not valid`;
//     }
// }