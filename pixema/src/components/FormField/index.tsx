import React, { useState } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.scss';
import { FormFieldProps, FormFieldElement } from './types';

export const FormField = forwardRef<FormFieldElement, FormFieldProps>(
  function FormField(
    props: FormFieldProps,
    ref: React.ForwardedRef<FormFieldElement>
  ) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const handleClickToggle = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

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
            type={isPasswordVisible ? 'text' : props.type}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            id={props.name}
          />
          {props.passwordToggle && (
            <button
              type="button"
              className={styles['form-field__password-toggle']}
              onClick={handleClickToggle}
            >
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/pastel-glyph/64/surprise--v1.png"
                alt="surprise--v1"
              />
            </button>
          )}
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
