import { ComponentProps } from "react";
import { Image } from "../ui/image";

type Props = ComponentProps<typeof Image>

export function UserPhoto({ ...rest }: Props) {
    return (
        <Image {...rest} />
    )
}