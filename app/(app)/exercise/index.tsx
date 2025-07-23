import { VStack } from "@/components/ui/vstack";
import { ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { RouteProps } from "../home";
import { Heading } from "@/components/ui/heading";
import { useEffect } from "react";
import { Image } from "@/components/ui/image"
import { Box } from "@/components/ui/box";
import BodySvg from "@assets/images/body.svg";
import SeriesSvg from "@assets/images/series.svg"
import RepetitionSvg from "@assets/images/repetitions.svg"
import { Button } from "@/components/mine/Button";

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
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 32 }}
            >
                <VStack className="p-8">
                    <Image
                        source={{
                            uri: "https://preview.redd.it/tem-diferen%C3%A7a-fazer-puxada-frente-ou-graviton-v0-rigllwi8z2ke1.jpg?width=1080&crop=smart&auto=webp&s=a06e0b16720edaeb438994ea9387195452263b39"
                        }}
                        alt="Exercise image"
                        className="w-full h-80 mb-3 rounded-lg"
                        resizeMode="cover"
                    />

                    <HStack className="bg-gray-600 rounded-md pb-4 px-4 items-center justify-around ">
                        <HStack className="items-center justify-center mb-6 mt-5">
                            <SeriesSvg />
                            <Text className="text-gray-200 ml-2">3 séries</Text>
                        </HStack>
                        <HStack>
                            <RepetitionSvg />
                            <Text className="text-gray-200 ml-2">12 repetições</Text>
                        </HStack>
                    </HStack>
                    <Button title="Marcar como realizado" />


                    <HStack className="bg-gray-600 rounded-md pb-4 px-4 items-center justify-around ">
                        <HStack className="items-center justify-center mb-6 mt-5">
                            <SeriesSvg />
                            <Text className="text-gray-200 ml-2">3 séries</Text>
                        </HStack>
                        <HStack>
                            <RepetitionSvg />
                            <Text className="text-gray-200 ml-2">12 repetições</Text>
                        </HStack>
                    </HStack>
                    <Button title="Marcar como realizado" />
                </VStack>
            </ScrollView>

        </VStack>
    )
}