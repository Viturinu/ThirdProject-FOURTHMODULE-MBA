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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome"),
    email: yup.string().required("Informe o e-mail").email("E-mail inválido"), //ele deve criar o pattern, similar ao que foi feito ali abaixo e quando preenchermos o cambo email ele tenta aplicar o patter e rejeita caso não der match com a string testada.
    password: yup.string().required("Informe a senha").min(6, "A senha deve conter pelo menos 6 dígitos"),
    passwordConfirm: yup.string().required("Informe a confirmação da senha").oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
})

type FormProps = yup.InferType<typeof signUpSchema>;

export default function SignUp() {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormProps>({
        resolver: yupResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        }
    })

    function handleUserCreation({ name, email, password, passwordConfirm }: FormProps) {
        console.log({ name, email, password, passwordConfirm })
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

                        <Controller
                            name="name"
                            control={control}
                            // Essa validação não é mais necessária, pois o proprio yup a fará
                            // rules={{
                            //     required: "Informe o nome."
                            // }}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="Nome" onChangeText={onChange} value={value} errorMessage={errors.name?.message} />
                            )}
                        />

                        <Controller
                            name="email"
                            control={control}
                            // Essa validação não é mais necessária, pois o proprio yup a fará
                            // rules={{
                            //     required: "Informe o e-mail",
                            //     pattern: {
                            //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //         message: "E-mail inválido"
                            //     }
                            // }}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={value} onChangeText={onChange} errorMessage={errors.email?.message} />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="Senha" value={value} onChangeText={onChange} errorMessage={errors.password?.message} eyeIcon />
                            )}
                        />

                        <Controller
                            name="passwordConfirm"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="Confirme senha" onChangeText={onChange} value={value} onSubmitEditing={handleSubmit(handleUserCreation)} errorMessage={errors.passwordConfirm?.message} eyeIcon />
                            )}
                        />

                        <Button title="Criar e acessar" action="primary" variant="solid" onPress={handleSubmit(handleUserCreation)} />

                    </Center>

                    <Button title="Voltar para o login" action="secondary" variant="outline" onPress={handleGoBack} />

                </VStack>
            </VStack >
        </ScrollView>
    );
}
