import React, { useState } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { AppError } from "@/util/AppError";
import { useToast } from "@/components/ui/toast";
import { ToastMessage } from "@/components/mine/ToastMessage";

export default function Home() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const router = useRouter();

    const { SignIn } = useAuth();

    function handleNavigateToSignUp() {
        router.navigate("/sign-up");
    }

    async function handleSignIn() {
        try {
            setIsLoading(true);
            await SignIn(email, password); //aqui ele tenta chama a rota, o interceptor vai estar interceptando e se ele entrar no erro (http code) e, consequentemente, no Promise.reject, ele vai ser capturado logo baixo.

        } catch (error) { //capturou o Promise.reject() do itnerceptor e agora vai testar se tem o data->message que é do ibjeto customizado de erro
            const isAppError = error instanceof AppError; //se for um erro customizado ele retorna true pra isAppError
            const title = isAppError ? error.message : "Não foi possível entrar. Tente novamente mais tarde."; //aqui ele personalizada a mensagem, se é a que foi retornada da API e passada via data->message para o AppError. Se não for AppError, então ele cria uma mensagem genérica, pois aqui ele capturou um error genérico, sem detalhes.

            toast.show({ //função do toast é apenas disparar algo que dura poucos segundos, mas este algo, hoje, é criado e renderizado por nós.
                placement: "top",
                render: ({ id }) => ( //essa id é criada pelo toast automaticamente, e precisamos dela para usarmos o toast.close(id)
                    <ToastMessage id={id} action="error" title={title} onClose={() => toast.close(id)} />
                )
            })
            setIsLoading(false); //somente aqui porque se tentarmos e já tiver em outra tela, pode dar vazamento de memoria ao tentar mudar uma variavel que já foi destruida.
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }} //para o scrollview ser permitido a ocupar toda a tela - crescer - contrário de shrink
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

                        <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                        <Input placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry />

                        <Button title="Acessar" action="primary" variant="solid" onPress={handleSignIn} isLoading={isLoading} />

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
