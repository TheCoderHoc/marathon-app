import { Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { TextAreaRef } from "antd/es/input/TextArea";
import { ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type PropsType = TextAreaProps & {
    label?: string;
};

export default forwardRef(function TextArea(
    props: PropsType,
    ref: ForwardedRef<TextAreaRef>
) {
    const { id, className, ...rest } = props;

    const classNames = twMerge("w-full", className);

    return (
        <Input.TextArea id={id} className={classNames} {...rest} ref={ref} />
    );
});
