import { HistoryCard } from "@/components/mine/HistoryCard";
import { ScreenHeader } from "@/components/mine/ScreenHeader";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text"
import { useState } from "react";
import { SectionList } from "react-native";

export default function History() {

    const [exercises, setExercises] = useState([
        {
            title: "22.07.24",
            data: ["Puxada frontal", "Remada unilateral"]
        },
        {
            title: "23.07.24",
            data: ["Puxada frontal"]
        },
    ])

    return (
        <Center>
            <ScreenHeader title="Histórico" />
            <SectionList
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={() => <HistoryCard />}
                renderSectionHeader={({ section }) => (
                    <Heading className="text-gray-200 text-md mt-10 mb-3 font-heading">{section.title}</Heading>
                )}
                style={{ paddingHorizontal: 32 }}
                contentContainerStyle={
                    exercises.length === 0 && { flex: 1, justifyContent: "center" }
                }
                ListEmptyComponent={() => (
                    <Text className="text-gray-100">
                        Não há exercicios registrados ainda. {"\n"} Vamos fazer exercícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </Center>
    )
}
