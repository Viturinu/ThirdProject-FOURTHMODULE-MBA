import { ExerciseCard } from "@/components/mine/ExerciseCars";
import { Group } from "@/components/mine/Group";
import { HomeHeader } from "@/components/mine/HomeHeader";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useCallback, useEffect, useState } from "react";
import { FlatList, useWindowDimensions } from "react-native";
import { useFocusEffect, useRouter } from "expo-router"; //antigamente era useNavigation do react-navigation/native
import { AppError } from "@/util/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/mine/ToastMessage";
import { api } from "@/services/api";
import { ExerciseDTO } from "@/dtos/ExerciseDTO";
import { Loading } from "@/components/mine/Loading";

export type RouteProps = {
    id: string
    // name: string
    // muscleCategory: string //Não preciso mais disso, pois vamos resgatar da API via id que está sendo passado
}

export default function Home() {

    const { width, height } = useWindowDimensions(); //ou podenmos usar o Dimension from RN, e fazer tudo manual     Dimensions.get('window').width > Dimensions.get('window').height... etc
    const isLandscape = width > height;

    const [exercises, setExercises] = useState<ExerciseDTO[]>([] as ExerciseDTO[]);
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSelected, setGroupSelected] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);

    const toast = useToast();
    const router = useRouter(); //antigamente seria o const navigation = useNavigation<AppNavigatorRoutesProps>(), assim ele já reconheceria as rotas que já estariam previamente tipadas

    async function fetchGroups() {
        try {
            const response = await api.get("/groups");
            setGroups(response.data);

        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os grupos musculares."

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="error" title="Essa imagem é muito grande. Escolha uma de até 5MB." onClose={() => toast.close(id)} />
                )
            })
        }
    }

    async function fetchExercisesByGroup() {
        try {
            setIsLoading(true);
            const response = await api.get(`/exercises/bygroup/${groupSelected}`);
            setExercises(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar os exercícios."

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

    function handleOpenExerciseDetails(id: string) {
        router.navigate({
            pathname: "/exercise",
            params: {
                id,
            }
        })
    }

    useEffect(() => {
        fetchGroups();
    })

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    }, [groupSelected])) //toda vez que groupSelected muda, ele dispara a função ou quando a gente volta pra tela

    return (
        <VStack className="flex-1">
            <HomeHeader />

            <FlatList
                data={groups}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    return (
                        <Group
                            name={item}
                            isActive={groupSelected === item}
                            onPress={() => setGroupSelected(item)}
                        />
                    )
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 32 }}
                style={
                    [{ maxHeight: 44, minHeight: 44 }, isLandscape ? { marginVertical: 15 } : { marginVertical: 40 }]}
            />

            {
                isLoading ? <Loading />
                    : <VStack className="px-8 flex-1">
                        <HStack className="justify-between items-center">
                            <Heading className="text-gray-200 text-md font-heading"> Exercícios</Heading>
                            <Text className="text-gray-200 text-sm font-body">
                                {exercises?.length}
                            </Text>
                        </HStack>
                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            className="mt-6"
                            renderItem={({ item }) => {
                                return <ExerciseCard data={item} onPress={() => handleOpenExerciseDetails(item.id)} />
                            }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={Object.keys(exercises).length == 0 ? {
                                flex: 1,
                                justifyContent: "center",
                                alignContent: "center",
                                alignSelf: "center"
                            } : {
                                paddingBottom: 20
                            }}
                            ListEmptyComponent={() => {
                                return (
                                    <Text>Gentileza, selecionar um grupo muscular.</Text>
                                )
                            }}
                        />
                    </VStack>
            }
        </VStack>
    )
}