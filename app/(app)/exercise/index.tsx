import { VStack } from "@/components/ui/vstack";
import { ScrollView, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { Icon } from "@/components/ui/icon";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { RouteProps } from "../home";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image"
import BodySvg from "@assets/images/body.svg";
import SeriesSvg from "@assets/images/series.svg"
import RepetitionSvg from "@assets/images/repetitions.svg"
import { Button } from "@/components/mine/Button";
import { AppError } from "@/util/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/mine/ToastMessage";
import { api } from "@/services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";
import { Box } from "@/components/ui/box";
import { Loading } from "@/components/mine/Loading";

export default function Exercise() {

    const [sendingRegister, setSendingRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

    const router = useRouter(); //antigamente seria o const navigation = useNavigation<AppNavigatorRoutesProps>(), assim ele já reconheceria as rotas que já estariam previamente tipadas
    const toast = useToast();

    const { id } = useLocalSearchParams<RouteProps>(); //antes pegavamos pelo router declaro com useRouter(), depois colocavamos route.params e resgatava. (não sei se isso funciona hoje)

    function handleGoBack() {
        router.back();
    }

    async function fetchExerciseDetails() {
        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/${id}`);
            setExercise(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício."

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="error" title={title} onClose={() => toast.close(id)} />
                )
            })
        } finally {
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister() {
        try {
            setSendingRegister(true)
            await api.post("/history", { exercise_id: id })
            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="success" title="Parabéns pela realização de mais um exercício." onClose={() => toast.close(id)} />
                )
            })

            router.push("/history")
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os detalhes do exercício."

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="error" title={title} onClose={() => toast.close(id)} />
                )
            })
        } finally {
            setSendingRegister(false);
        }
    }
    useEffect(() => {
        fetchExerciseDetails();
    }, [])

    return (
        <VStack className="flex-1">
            <VStack className="px-8 bg-gray-600 pt-12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} className="text-green-500" size="xl" />
                </TouchableOpacity>

                <HStack className="justify-between items-center mt-4 pb-8">

                    <Heading className="text-gray-100 font-heading text-lg flex-shrink">{exercise.name}</Heading>

                    <HStack className="items-center">
                        <BodySvg />
                        <Text className="text-gray-200 ml-1 capitalize">
                            {exercise.group}
                        </Text>
                    </HStack>
                </HStack>

            </VStack>
            {
                isLoading ? <Loading />
                    : <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 32 }}
                    >
                        <VStack className="p-8">
                            <Box className="rounded-lg mb-3 overflow-hidden">
                                <Image
                                    source={{
                                        uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` //isso é um .gif, que pode ser carregado dentro do Image do gluestack
                                    }}
                                    alt="Exercise image"
                                    className="w-full h-80 mb-3 rounded-lg"
                                    resizeMode="cover"
                                />
                            </Box>

                            <HStack className="bg-gray-600 rounded-md pb-4 px-4 items-center justify-around ">
                                <HStack className="items-center justify-center mb-6 mt-5">
                                    <SeriesSvg />
                                    <Text className="text-gray-200 ml-2">{exercise.series} séries</Text>
                                </HStack>
                                <HStack>
                                    <RepetitionSvg />
                                    <Text className="text-gray-200 ml-2">{exercise.repetitions} repetições</Text>
                                </HStack>
                            </HStack>
                            <Button
                                title="Marcar como realizado"
                                isLoading={sendingRegister}
                                onPress={handleExerciseHistoryRegister}
                            />

                        </VStack>
                    </ScrollView>
            }
        </VStack>
    )
}
