import { Center } from "../ui/center";
import { Spinner } from "../ui/spinner";

export function Loading() {
    return (
        <Center className="flex-1">
            <Spinner className="text-gray-100" />
        </Center>
    )
} 