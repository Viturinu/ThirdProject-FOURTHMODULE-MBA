import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Text } from "../ui/text";
import { Icon } from "../ui/icon";
import { ChevronRight } from "lucide-react-native";

type Props = TouchableOpacityProps

export function ExerciseCard({ ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <HStack className="bg-gray-500 items-center p-2 pr-4 rounded-md mb-3">
                <Image
                    width={16}
                    height={16}
                    className="rounded-md mr-4"
                    alt="Exercise image"
                    source={{ uri: "https://treinomestre.com.br/wp-content/uploads/2019/04/treino-de-academia.jpg" }}
                    resizeMode="cover"
                />

                <VStack className="flex-1">
                    <Heading className="text-lg text-white font-heading">Puxada frontal</Heading>
                    <Text className="text-sm text-gray-200 mt-1" numberOfLines={2}>3 séries x 12 repetições</Text>
                </VStack>

                <Icon as={ChevronRight} className="text-gray-300" />
            </HStack>
        </TouchableOpacity>
    )
}