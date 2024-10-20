import { Input as AntdInput, InputProps } from "antd";
import { twMerge } from "tailwind-merge";

type PropsType = InputProps & {
    label?: string;
};

export default function Input(props: PropsType) {
    const { id, label, className, ...rest } = props;

    const classNames = twMerge("", className);

    return (
        <div>
            {label && <label htmlFor={id}>{label}</label>}
            <AntdInput id={id} className={classNames} {...rest} />
        </div>
    );
}
