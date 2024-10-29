import { Button as AntdButton, ButtonProps, ConfigProvider } from "antd";
import { twMerge } from "tailwind-merge";

type PropsType = ButtonProps & {
    wave?: boolean;
};

export default function Button(props: PropsType) {
    const { children, className, wave = true, ...rest } = props;

    const classNames = twMerge(
        "[&.ant-click-animating-node]:hidden",
        className
    );

    const BaseComponent = (
        <AntdButton className={classNames} {...rest}>
            {children}
        </AntdButton>
    );

    if (wave) return BaseComponent;

    return (
        <ConfigProvider wave={{ disabled: true }}>
            {BaseComponent}
        </ConfigProvider>
    );
}
