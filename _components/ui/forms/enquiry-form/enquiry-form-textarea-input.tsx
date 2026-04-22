import classNames from "classnames";
import { inputStyles } from "@/_styles/input-styles";

interface EnquiryFormTextareaInputProps {
  label: string;
  name: string;
  defaultValue?: string;
  placeholderText?: string;
  required?: boolean;
  cssClasses?: string;
}

const EnquiryFormTextareaInput = ({
  label,
  name,
  defaultValue,
  placeholderText,
  required,
  cssClasses,
}: EnquiryFormTextareaInputProps) => {
  return (
    <div className={classNames("flex flex-col gap-3", cssClasses)}>
      <label htmlFor={name} className="text-white text-subheading">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholderText}
        required={required}
        className={classNames(inputStyles(), "h-[127px] resize-none")}
      />
    </div>
  );
};

export default EnquiryFormTextareaInput;
