import { Center } from "../ui/center";
import { Heading } from "../ui/heading";

type Props = {
    title: string
}

export function ScreenHeader({ title }: Props) {

    return (
        <Center className="w-full bg-gray-600 pb-6 pt-16">
            <Heading className="text-xl font-heading text-gray-100">
                {title}
            </Heading>
        </Center>
    )

}