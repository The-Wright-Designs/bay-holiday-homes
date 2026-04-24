import classNames from "classnames";
import { inputStyles } from "@/_styles/input-styles";

interface EnquiryFormTextInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  placeholderText?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoComplete?: string;
  cssClasses?: string;
}

const EnquiryFormTextInput = ({
  label,
  name,
  defaultValue,
  placeholderText,
  required,
  disabled,
  readOnly,
  autoComplete,
  cssClasses,
}: EnquiryFormTextInputProps) => {
  return (
    <div className={classNames("flex flex-col gap-3", cssClasses)}>
      <label htmlFor={name} className="text-white text-subheading">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={inputStyles(undefined, disabled || readOnly)}
        defaultValue={defaultValue}
        placeholder={placeholderText}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
    </div>
  );
};

export default EnquiryFormTextInput;
