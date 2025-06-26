import { ComponentProps } from "react";
import { Button as GluestackButton, ButtonText, ButtonSpinner } from "../ui/button";

type Props = ComponentProps<typeof GluestackButton> & {
    title: string;
    isLoading?: boolean;
}

export function Button({ title, isLoading = false, ...props }: Props) {
    return (
        <GluestackButton disabled={isLoading} className="w-full h-14 rounded-sm" {...props}>
            {
                isLoading ? <ButtonSpinner className="text-gray-100" /> : <ButtonText className="color-white">{title}</ButtonText>
            }
        </GluestackButton>
    )
}