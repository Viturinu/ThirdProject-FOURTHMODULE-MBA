import React from "react";
import { VStack } from "@/components/ui/vstack";
import BackgroundImg from "@assets/images/background.png" //precisamos fazer o type definition <---> png.d.ts
import { Image } from "@/components/ui/image";
import Logo from "@assets/images/logo.svg"
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/mine/Input";

export default function Home() {
  return (
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
        <Center className="gap-2">
          <Heading className="text-gray-100">
            Acesse a conta
          </Heading>
          <Input placeholder="Email" />
          <Input placeholder="Senha" />
        </Center>
      </VStack>
    </VStack >
  );
}
