import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button(props: PropsWithChildren<ButtonProps>) {
  const { children, disabled, isLoading = false, type = 'button', ...buttonProps } = props;

  return (
    <button disabled={disabled || isLoading} type={type} {...buttonProps}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}
