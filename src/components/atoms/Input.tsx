import { Input as AntdInput, InputProps, InputRef } from "antd";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type PropsType = InputProps & {
    label?: string;
};

export default forwardRef(function Input(
    props: PropsType,
    ref: ForwardedRef<InputRef>
) {
    const { id, className, ...rest } = props;

    const classNames = twMerge("w-full", className);

    return (
        <div className="w-full">
            <AntdInput id={id} className={classNames} {...rest} ref={ref} />
        </div>
    );
});
