import { ChangeEvent, createElement, FunctionComponent } from "react";
import { classNames } from "utils";
import styles from "./style.scss";

export interface FormElementProps<T = never> {
    title: string;
    value: string | number;
    onChange: (e: ChangeEvent<T>) => void;
    white?: boolean;
    className?: string;
}

/**
 * `FormElement` should be used to wrap all of the other form components to give
 * them a constant stile.
 */
const FormElement: FunctionComponent<FormElementProps> = (props) => (
    <div
        className={classNames(styles.formElement, props.className, {
            [styles.white]: props.white,
        })}
    >
        <label>
            <div className={styles.title}>{props.title}</div>
            {props.children}
        </label>
    </div>
);

interface InputProps extends FormElementProps<HTMLInputElement> {
    type?:
        | "text"
        | "number"
        | "password"
        | "email"
        | "tel"
        | "sumbit"
        | "reset"
        | "button"
        | "radio"
        | "time";

    placeholder?: string;
}
export const Input: FunctionComponent<InputProps> = (props) => (
    <FormElement {...props}>
        <input
            className={styles.input}
            type={props.title ?? "text"}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </FormElement>
);

export const TextArea: FunctionComponent<FormElementProps<
    HTMLTextAreaElement
>> = (props) => (
    <FormElement {...props}>
        <textarea
            className={styles.input}
            value={props.value}
            onChange={props.onChange}
        />
    </FormElement>
);

interface SelectProps extends FormElementProps<HTMLSelectElement> {
    options: Array<[string, string]>;
}

export const Select: FunctionComponent<SelectProps> = (props) => (
    <FormElement {...props}>
        <select
            className={styles.input}
            value={props.value}
            onChange={props.onChange}
        >
            {props.options.map(([value, title]) => (
                <option key={value} value={value}>
                    {title}
                </option>
            ))}
        </select>
    </FormElement>
);
