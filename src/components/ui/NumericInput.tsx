'use client';

import { ForwardedRef, useEffect, useState } from 'react';

import { formatNumber } from '@/libs/format';

const PATTERN = /^(-)?([0-9]*)(\.[0-9]*)?$/;

const NumericInput = ({
  ref,
  value,
  onChange,
  range,
  allowNegative = true,
  allowDecimal = true,
  maxDecimals = 9,
  ...props
}: Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
  ref?: ForwardedRef<HTMLInputElement>;
  value: number | null;
  onChange: (value: number) => void;
  range?: [number, number];
  allowNegative?: boolean;
  allowDecimal?: boolean;
  maxDecimals?: number;
}) => {
  const defaultInput = value ? formatNumber(value, { maximumFractionDigits: maxDecimals, useGrouping: false }) : '';

  const [input, setInput] = useState(defaultInput);

  const handleInputChange = (input: string) => {
    const [match, negative = '', integer = '', decimal = ''] = input.match(PATTERN) || [];
    const trimmedInput = negative + integer.replace(/^0+([1-9]*.)$/, '$1') + decimal.substring(0, maxDecimals + 1);
    const parsedValue = !isNaN(+trimmedInput) ? +trimmedInput : 0;

    if (match === undefined || (!!negative && !allowNegative) || (!!decimal && !allowDecimal)) {
      return;
    }
    if (range) {
      const [min, max] = range;

      if (parsedValue < min || parsedValue > max) {
        return;
      }
    }
    setInput(trimmedInput);
    onChange?.(parsedValue);
  };
  const handleInputBlur = () => {
    setInput(defaultInput);
  };
  useEffect(() => {
    const parsedValue = !isNaN(+input) ? +input : 0;

    if (parsedValue !== value) {
      setInput(defaultInput);
    }
  }, [value]);

  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      value={input}
      placeholder="0"
      onChange={(e) => handleInputChange(e.target.value)}
      onBlur={handleInputBlur}
      {...props}
    />
  );
};

NumericInput.displayName = 'NumericInput';

export { NumericInput };
