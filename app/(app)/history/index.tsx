import { HistoryCard } from "@/components/mine/HistoryCard";
import { Loading } from "@/components/mine/Loading";
import { ScreenHeader } from "@/components/mine/ScreenHeader";
import { ToastMessage } from "@/components/mine/ToastMessage";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text"
import { useToast } from "@/components/ui/toast";
import { HistoryByDayDTO } from "@/dtos/HistoryByDayDTO";
import { api } from "@/services/api";
import { AppError } from "@/util/AppError";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SectionList } from "react-native";

export default function History() {

    const toast = useToast();

    const [isLoading, setIsLoading] = useState(true)
    const [history, setHistory] = useState<HistoryByDayDTO[]>([]);

    async function fetchHistory() {
        try {
            setIsLoading(true);
            const response = await api.get("/history")
            setHistory(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível carregar o histórico."

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

    useFocusEffect(useCallback(() => {
        fetchHistory();
    }, []))
    return (
        <Center>
            <ScreenHeader title="Histórico" />
            {
                isLoading ? <Loading />
                    : <SectionList
                        sections={history}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <HistoryCard data={item} />}
                        renderSectionHeader={({ section }) => (
                            <Heading className="text-gray-200 text-md mt-10 mb-3 font-heading">{section.title}</Heading>
                        )}
                        style={{ paddingHorizontal: 32 }}
                        contentContainerStyle={
                            history.length === 0 && { flex: 1, justifyContent: "center" }
                        }
                        ListEmptyComponent={() => (
                            <Text className="text-gray-100">
                                Não há exercicios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
                            </Text>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
            }
        </Center>
    )
}
