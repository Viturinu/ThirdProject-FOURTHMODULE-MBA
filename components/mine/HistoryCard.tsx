import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import { Text } from "@/components/ui/text";

export function HistoryCard() {
    return (
        <HStack className="w-full px-5 py-4 mb-3 bg-gray-600 rounded-md items-center justify-between">
            <VStack className="flex-1 mr-5">
                <Heading className="text-white text-md capitalize font-heading" numberOfLines={1}>
                    Costas
                </Heading>
                <Text className="text-gray-100 text-lg" numberOfLines={1}>
                    Puxada frontal
                </Text>
            </VStack>

            <Text className="text-gray-300 text-md">
                08:56
            </Text>
        </HStack>
    )
}