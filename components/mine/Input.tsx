import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "../ui/input"

type Props = ComponentProps<typeof InputField>;

export function Input({ ...rest }: Props) {
    return (
        <GluestackInput className="bg-gray-700 border-0 h-14 px-4 rounded-md focus:border-1 focus:text-green-500">
            <InputField className="font-body text-white placeholder:color-gray-300" {...rest} />
        </GluestackInput>
    )
}