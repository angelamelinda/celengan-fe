import React, { ChangeEvent, FC, KeyboardEvent } from 'react';
import { InputWrapper, Label, Input, InputError } from './styled';

interface IInput {
  type?: string;
  placeholder: string;
  name: string;
  id: string;
  value?: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  className?: string;
}

const InputComponent: FC<IInput> = ({
  type = 'text',
  placeholder,
  name,
  id,
  value,
  onChange,
  label,
  error,
  className,
  onKeyPress,
}) => {
  const getClass = (className?: string, error?: string) => {
    let initClass = '';

    if (className) {
      initClass += `${className} `;
    }

    if (error) {
      initClass += `error `;
    }

    return initClass;
  };

  return (
    <InputWrapper className={getClass(className, error)}>
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        onKeyPress={onKeyPress}
      />
      {error && <InputError>{error}</InputError>}
    </InputWrapper>
  );
};

export default InputComponent;
