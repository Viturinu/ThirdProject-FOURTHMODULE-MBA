import React from "react";
import { VStack } from "@/components/ui/vstack";
import BackgroundImg from "@assets/images/background.png" //precisamos fazer o type definition <---> png.d.ts
import { Image } from "@/components/ui/image";
import Logo from "@assets/images/logo.svg"
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/mine/Input";
import { Button } from "@/components/mine/Button";
import { ScrollView } from "react-native";

import { useRouter } from "expo-router";

export default function Home() {

    const navigation = useRouter();

    function handleNavigateToSignUp() {
        navigation.navigate("/sign-up")
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <VStack className="flex-1 bg-gray-700">
                <Image
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    className="absolute w-full h-[624px]"
                    alt="Imagem de fundo do Gym Ignite"
                />
                <VStack className="flex-1 px-10">
                    <Center className="my-24">
                        <Logo />
                        <Text className="text-gray-100 text-sm">
                            Treine sua mente e o seu corpo.
                        </Text>
                    </Center>
                    <Center className="flex-col gap-4 w-full">
                        <Heading className="text-gray-100">
                            Acesse a conta
                        </Heading>

                        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />
                        <Input placeholder="Senha" secureTextEntry />

                        <Button title="Acessar" action="primary" variant="solid" />

                    </Center>

                    <Center className="flex mt-16">
                        <Text className="color-gray-100 text-sm mb-3 font-body">Ainda não tem acesso?</Text>

                        <Button title="Criar Conta" action="secondary" variant="outline" onPress={handleNavigateToSignUp} />
                    </Center>
                </VStack>
            </VStack >
        </ScrollView>
    );
}
