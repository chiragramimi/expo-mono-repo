import React from 'react';
import { TextInput as RNTextInput } from 'react-native';

import { Field, FieldProps } from 'formik';

import { Input } from './Input';
import { TextInputProps } from './TextInputProps';

export const TextInput = React.memo(
  React.forwardRef(
    ({ ...props }: TextInputProps, ref?: React.Ref<RNTextInput | null>) => {
      const { name } = props;
      return (
        <Field name={name}>
          {({ form, meta }: FieldProps) => {
            return (
              <Input
                variant="standard"
                onChangeText={text => {
                  form?.handleChange(name)(text);
                }}
                onBlur={form?.handleBlur(name)}
                value={meta?.value}
                error={meta?.error && meta?.touched ? meta?.error ?? '' : ''}
                ref={ref}
                {...props}
              />
            );
          }}
        </Field>
      );
    }
  )
);
