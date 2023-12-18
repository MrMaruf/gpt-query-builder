import { defineRule, configure } from 'vee-validate';
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  numeric,
  confirmed,
  min_value as minValue,
  max_value as maxValue,
} from '@vee-validate/rules';

export default {
  install(app: any) {
    defineRule('required', required);
    defineRule('tos', required);
    defineRule('min', min);
    defineRule('max', max);
    defineRule('alphaSpaces', alphaSpaces);
    defineRule('email', email);
    defineRule('numeric', numeric);
    defineRule('minValue', minValue);
    defineRule('maxValue', maxValue);
    defineRule('passwordsMismatch', confirmed);
    defineRule('hasDigit', (value: string) => /\d/.test(value));
    defineRule('hasLowercase', (value: string) => /[a-z]/.test(value));
    defineRule('hasUppercase', (value: string) => /[A-Z]/.test(value));
    defineRule('hasSymbol', (value: string) => /[!@#$%^&*_]/.test(value));
    defineRule('onlyAllowedCharacters', (value: string) =>
      /^[\w!@#$%^&*_]+$/.test(value)
    );

    configure({
      generateMessage: (context: Record<string, any>) => {
        const { field, rule } = context;
        if (rule.message) {
          return context.rule.message;
        }

        const messages: Record<string, any> = {
          required: `This field is required.`,
          min: `This field's value is too short.`,
          max: `This field's value is too long.`,
          alphaSpaces: `The field ${field} may only contain alphabetical characters and spaces.`,
          email: `This field must be a valid email.`,
          numeric: `This field may only contain numeric characters.`,
          minValue: `This field's value is too low.`,
          maxValue: `This field's value is too high.`,
          passwordsMismatch: `The passwords do not match.`,
          hasDigit: `The ${field} must include at least one digit.`,
          hasLowercase: `The ${field} must include at least one lowercase letter.`,
          hasUppercase: `The ${field} must include at least one uppercase letter.`,
          hasSymbol: `The ${field} must include at least one of the following symbols: !@#$%^&*_`,
          onlyAllowedCharacters: `The ${field} can only include alphanumeric characters and the following symbols: !@#$%^&*_`,
        };

        const message = messages[rule.name]
          ? messages[rule.name]
          : `The field ${field} is invalid.`;

        return message;
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true,
    });
  },
};
