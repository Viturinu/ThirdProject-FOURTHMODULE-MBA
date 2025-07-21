import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Text } from "../ui/text";
import { clsx } from 'clsx';

type Props = ComponentProps<typeof Button> & {
    name: string;
    isActive: boolean;
}

export function Group({ name, isActive, ...rest }: Props) {
    return (
        <Button
            className={clsx(
                "mr-3 h-10 min-w-24 rounded-md justify-center items-center bg-gray-600",
                isActive ? "border border-green-500" : "border-transparent"
            )}
            {...rest}

        >
            <Text className={clsx(isActive ? "text-green-500" : "text-gray-200", "uppercase text-xs font-heading")}>{name}</Text>
        </Button>
    )
}