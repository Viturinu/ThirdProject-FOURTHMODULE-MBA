import { TouchableOpacity } from "react-native";
import { Heading } from "../ui/heading";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";
import { UserPhoto } from "./UserPhoto";
import { LogOut } from "lucide-react-native";
import { useRouter } from "expo-router";

export function HomeHeader() {

    const router = useRouter(); //antigamente seria o const navigation = useNavigation<AppNavigatorRoutesProps>(), assim ele já reconheceria as rotas que já estariam previamente tipadas

    function handleGoToProfileScreen() {
        router.push("/(app)/profile");
    }

    return (
        <HStack className="bg-gray-600 pt-16 pb-5 px-8 items-center gap-4">
            <TouchableOpacity onPress={handleGoToProfileScreen}>
                <UserPhoto size="md" source={{ uri: "https://github.com/viturinu.png" }} alt="profile picture" className="rounded-full border-2 border-gray-400 bg-gray-400" />
            </TouchableOpacity>
            <VStack className="flex-1">
                <Text className="text-gray-100 text-sm">
                    Olá,
                </Text>
                <Heading className="text-gray-100 text-md">
                    Victor Oliveira
                </Heading>
            </VStack>
            {/* <LogOut color="white" /> */}
            <TouchableOpacity>
                <Icon as={LogOut} size="xl" className="text-gray-200" />
            </TouchableOpacity>
        </HStack>
    )
}