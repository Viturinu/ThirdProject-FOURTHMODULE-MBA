import { Input } from "@/components/mine/Input";
import { ScreenHeader } from "@/components/mine/ScreenHeader";
import { UserPhoto } from "@/components/mine/UserPhoto";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Profile() {
    return (
        <VStack className="flex-1">
            <ScreenHeader title="Perfil" />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>

                <Center className="mt-6 px-10">
                    <TouchableOpacity className="mb-8">
                        <View className="items-center">
                            <UserPhoto source={{ uri: "https://github.com/viturinu.png" }} alt="User picture" size="xl" className="rounded-full border-2 border-gray-400 bg-gray-400" />
                            <Text className="text-green-500 font-heading text-md mt-2 ">Alterar Foto</Text>
                        </View>
                    </TouchableOpacity>
                    <Center className="w-full gap-4">
                        <Input placeholder="Nome" className="bg-gray-600" />

                        <Input value="victor.almeida.ti@gmail.com" keyboardType="email-address" className="text-gray-200 bg-gray-600" isReadOnly />
                    </Center>
                </Center>
            </ScrollView>
        </VStack>
    )
}