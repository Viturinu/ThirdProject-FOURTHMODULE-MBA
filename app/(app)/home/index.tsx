import { ExerciseCard } from "@/components/mine/ExerciseCars";
import { Group } from "@/components/mine/Group";
import { HomeHeader } from "@/components/mine/HomeHeader";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useRouter } from "expo-router"; //antigamente era useNavigation do react-navigation/native
import { AppError } from "@/util/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/mine/ToastMessage";
import { api } from "@/services/api";

export type RouteProps = {
    name: string
    muscleCategory: string
    id: string
}

export default function Home() {

    const [exercises, setExercises] = useState(["Puxada frontal", "Puxada curvada", "Puxada unilateral", "Levantamento terra",]);
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSelected, setGroupSelected] = useState("Costas");

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

    function handleOpenExerciseDetails() {
        router.navigate({
            pathname: "/(app)/exercise",
            params: {
                id: 5,
                name: "Puxada frontal",
                muscleCategory: "Costas"
            }
        })
    }

    useEffect(() => {
        fetchGroups();
    })
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
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />

            <VStack className="px-8 flex-1">
                <HStack className="justify-between items-center">
                    <Heading className="text-gray-200 text-md font-heading"> Exercícios</Heading>
                    <Text className="text-gray-200 text-sm font-body">
                        {exercises.length}
                    </Text>
                </HStack>
                <FlatList
                    className="mt-6"
                    keyExtractor={item => item}
                    data={exercises}
                    renderItem={() => {
                        return <ExerciseCard onPress={handleOpenExerciseDetails} />
                    }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 20
                    }}
                />
            </VStack>
        </VStack>
    )
}