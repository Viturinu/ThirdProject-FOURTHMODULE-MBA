import { Group } from "@/components/mine/Group";
import { HomeHeader } from "@/components/mine/HomeHeader";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { FlatList } from "react-native";

export default function Home() {

    const [groups, setGroups] = useState(["Costas", "Bíceps", "Tríceps", "Ombro"]);
    const [groupSelected, setGroupSelected] = useState("Costas");

    return (
        <VStack className="flex-1">
            <HomeHeader />
            <HStack>
                <FlatList
                    data={groups}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        return (
                            <Group
                                name="Costas"
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
            </HStack>
        </VStack>
    )
}