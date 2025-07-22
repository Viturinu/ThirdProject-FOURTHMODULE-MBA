import { VStack } from "@/components/ui/vstack";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { RouteProps } from "../home";
import { Heading } from "@/components/ui/heading";
import { useEffect } from "react";
import BodySvg from "@assets/images/body.svg";

export default function Exercise() {

    const router = useRouter(); //antigamente seria o const navigation = useNavigation<AppNavigatorRoutesProps>(), assim ele já reconheceria as rotas que já estariam previamente tipadas

    const { id, name, muscleCategory } = useLocalSearchParams<RouteProps>();

    function handleGoBack() {
        router.back();
    }

    useEffect(() => {
        console.log(id, typeof name, muscleCategory)
    }, [])
    return (
        <VStack className="flex-1">
            <VStack className="px-8 bg-gray-600 pt-12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} className="text-green-500" size="xl" />
                </TouchableOpacity>

                <HStack className="justify-between items-center mt-4 pb-8">

                    <Heading className="text-gray-100 font-heading text-lg flex-shrink">{name}</Heading>

                    <HStack className="items-center">
                        <BodySvg />
                        <Text className="text-gray-200 ml-1 capitalize">
                            {muscleCategory}
                        </Text>
                    </HStack>
                </HStack>

            </VStack>
        </VStack>
    )
}