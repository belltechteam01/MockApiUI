import * as yup from 'yup';

export type UseTranslateT = (s: string) => string;

export const Validation = (t: UseTranslateT): any => {
  const tp = (key: string): string => t(`validations.${key}`);
  return {
    campaign: () =>
      yup.object().shape({
        campaignName: yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required(tp('required')),
        otpExpiryNumber: yup.string().required(tp('required'))
      })
  };
};
// email: yup.string().email('Invalid email').required(tp('required')),
// firstName: yup
//   .string()
//   .ensure()
//   .matches(NAME_REGEX, tp('invalidFirstName'))
//   .required(tp('required')),
// lastName: yup
//   .string()
//   .ensure()
//   .matches(NAME_REGEX, tp('invalidLastName'))
//   .required(tp('required')),
