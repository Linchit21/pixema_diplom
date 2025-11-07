import React from 'react';
import { forwardRef } from 'react';
import { FormFieldProps, FormFieldElement } from './types';

import styles from './index.module.scss';

export const FormField = forwardRef<FormFieldElement, FormFieldProps>(
  function FormField(
    props: FormFieldProps,
    ref: React.ForwardedRef<FormFieldElement>
  ) {
    function renderLabel() {
      if (!props.label) return null;

      return (
        <label htmlFor={props.name} className={styles['form-field__label']}>
          {props.label}
        </label>
      );
    }

    function renderFormField() {
      if (props.type === 'textarea') {
        return (
          <textarea
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            className="form-control"
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            id={props.name}
          ></textarea>
        );
      }

      return (
        <div className={styles['form-field__input-wraper']}>
          <input
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            className={styles['form-field__input-field']}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            id={props.name}
          />
        </div>
      );
    }

    return (
      <div>
        {renderLabel()}
        {renderFormField()}
      </div>
    );
  }
);
