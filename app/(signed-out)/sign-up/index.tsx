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
import { router } from "expo-router";

export default function SignUp() {

    function handleUserCreation() {
        console.log("Usuário criado com sucesso.")
    }

    function handleGoBack() {
        router.back();
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <VStack className="flex-1 bg-gray-700 pb-3">
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
                    <Center className="flex-1 flex-col gap-4 w-full">
                        <Heading className="text-gray-100">
                            Crie sua conta
                        </Heading>

                        <Input placeholder="Nome" />

                        <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" />

                        <Input placeholder="Senha" secureTextEntry />

                        <Button title="Criar e acessar" action="primary" variant="solid" onPress={handleUserCreation} />

                    </Center>

                    <Button title="Voltar para o login" action="secondary" variant="outline" className="mt-12" onPress={handleGoBack} />

                </VStack>
            </VStack >
        </ScrollView>
    );
}
