import { Input as AntdInput, InputProps } from "antd";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type PropsType = InputProps & {
    label?: string;
};

export default forwardRef(function Input(props: PropsType, ref: any) {
    const { id, label, className, ...rest } = props;

    const classNames = twMerge("w-full", className);

    return (
        <div className="w-full">
            {label && <label htmlFor={id}>{label}</label>}
            <AntdInput id={id} className={classNames} {...rest} ref={ref} />
        </div>
    );
});
