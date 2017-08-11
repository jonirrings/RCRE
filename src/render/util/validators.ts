import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({
    name: 'IsArrayString',
    async: false
})
export class IsArrayString implements ValidatorConstraintInterface {
    validate(value: string[], args: ValidationArguments) {
        return value.every(i => typeof i === 'string');
    }

    defaultMessage(args: ValidationArguments) { // here you can provide default error message if validation failed
        return `${args.targetName} should the an array which every item's type is string`;
    }
}

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