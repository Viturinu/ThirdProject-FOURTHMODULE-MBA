import React from "react";
import { VStack } from "@/components/ui/vstack";
import BackgroundImg from "@assets/images/background.png" //precisamos fazer o type definition <---> png.d.ts
import { Image } from "@/components/ui/image";
import Logo from "@assets/images/logo.svg"
import { Center } from "@/components/ui/center";

export default function Home() {
  return (
    <VStack className="flex-1 bg-background-700">
      <Image
        source={BackgroundImg}
        defaultSource={BackgroundImg}
        className="absolute w-full h-[624px]"
        alt="Imagem de fundo do Gym Ignite"
      />

      <Center>
        <Logo />
      </Center>
    </VStack>
  );
}
