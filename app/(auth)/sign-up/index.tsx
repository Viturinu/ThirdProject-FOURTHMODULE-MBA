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
import { router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import { api } from "@/services/api";
import { useToast } from "@/components/ui/toast";
import { AppError } from "@/util/AppError";
import { ToastMessage } from "@/components/mine/ToastMessage";
import { useAuth } from "@/hooks/useAuth";

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome"),
    email: yup.string().required("Informe o e-mail").email("E-mail inválido"), //ele deve criar o pattern, similar ao que foi feito ali abaixo e quando preenchermos o cambo email ele tenta aplicar o patter e rejeita caso não der match com a string testada.
    password: yup.string().required("Informe a senha").min(6, "A senha deve conter pelo menos 6 dígitos"),
    passwordConfirm: yup.string().required("Informe a confirmação da senha").oneOf([yup.ref("password"), ""], "A confirmação da senha não confere."),
})

type FormProps = yup.InferType<typeof signUpSchema>;

export default function SignUp() {

    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const { SignIn } = useAuth()

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

    async function handleSignUp({ name, email, password }: FormProps) {
        try {
            setIsLoading(true);
            await api.post("/users", { name, email, password }); //axios já faz o 'response.json()' por padrão
            await SignIn(email, password);
        } catch (error) {
            const isAppError = error instanceof AppError; //verifica se o erro disparado foi aquele tratado pelo interceptor que nós programamos
            const title = isAppError ? error.message : "Não foi possível criar a conta. Tente novamente mais tarde." //verifica que foi erro que fizemos ou não, e aí atribui a mensagem que programamos no backend ou uma genérica aqui

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="error" title={title} onClose={() => toast.close(id)} />
                )
            })
            // if (axios.isAxiosError(error)) { //função do Axios para saber se o error é do Axios
            //     console.log(error.response?.data) //esse error que é disparado contém também o que, de fato, a api retornou, como mensagem, code, etc.
            // }
            // console.log(error);[
            setIsLoading(false); //sem finally pra não haver descarrego de memoria comn variaveis já destruidas na troca de screen
        }
        // const response = await fetch("http://10.0.0.117:3333/users", {
        //     method: "POST",
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         name, email, password
        //     })
        // });

        // const data = await response.json();
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
                                <Input placeholder="Confirme senha" onChangeText={onChange} value={value} onSubmitEditing={handleSubmit(handleSignUp)} errorMessage={errors.passwordConfirm?.message} eyeIcon />
                            )}
                        />

                        <Button title="Criar e acessar" action="primary" variant="solid" onPress={handleSubmit(handleSignUp)} isLoading={isLoading} />

                    </Center>

                    <Button title="Voltar para o login" action="secondary" variant="outline" onPress={handleGoBack} />

                </VStack>
            </VStack >
        </ScrollView>
    );
}
