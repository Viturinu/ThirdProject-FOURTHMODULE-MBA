import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "../ui/input"
import clsx from "clsx";

type Props = ComponentProps<typeof InputField> & {
    isReadOnly?: boolean
};

export function Input({ isReadOnly = false, ...rest }: Props) {
    return (
        <GluestackInput className={clsx("border-gray-700 bg-gray-600 h-14 rounded-md", isReadOnly ? "opacity-50" : "opacity-1")} focusColor="green" isReadOnly={isReadOnly}>
            <InputField className="font-body px-4 text-white placeholder:color-gray-300" {...rest} />
        </GluestackInput>
    )
}