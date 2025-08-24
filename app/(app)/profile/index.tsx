import { Button } from "@/components/mine/Button";
import { Input } from "@/components/mine/Input";
import { ScreenHeader } from "@/components/mine/ScreenHeader";
import { UserPhoto } from "@/components/mine/UserPhoto";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { ToastMessage } from "@/components/mine/ToastMessage";
import { useToast } from "@/components/ui/toast";
import { useForm, Controller, Resolver } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup"
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import * as yup from "yup";
import { api } from "@/services/api";
import { AppError } from "@/util/AppError";

// type FormDataProps = {
//     name: string;
//     email: string;
//     password: string;
//     old_password: string;
//     confirm_password: string;
// }

const profileSchema = yup.object({
    name: yup.string().required("Informe o nome."),
    old_password: yup.string().required("Informe a senha antiga."),
    password: yup.string()
        .min(6, "A senha deve ter mínimo de 6 dígitos.")
        .required("A nova senha é necessária.")
        .transform((value) => (value ? value : null)),
    confirm_password: yup
        .string()
        .required("A senha de confirmação é necessária.")
        .transform((value) => (value ? value : null))
        .oneOf([yup.ref("password")], "A confirmação da senha não confere.")
    // .when("password", {
    //     is: true,
    //     then: (schema) => schema.nullable().required("Informe a confirmação da senha.")
    // })
});

type FormDataProps = yup.InferType<typeof profileSchema>

export default function Profile() {

    const [isUpdating, setUpdating] = useState(false);
    const toast = useToast();
    const { user, updateUserProfile } = useAuth();

    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
        },
        resolver: yupResolver(profileSchema), // <- força coerção

    });

    const [userPhoto, setUserPhoto] = useState("https://github.com/viturinu.png");

    async function handleUserPhotoSelect() {
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({ //aqui acontece a seleção da imagem mesmo, tanto que podemos colocar base64 aqui nos parametros para retornar a imagem em base 64, além, claro de varios metadados, como uri, type, rotation, mimetype, etc;
                mediaTypes: ["images"],
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true, //aqui permite editar, mas sempre respeitando o aspecto 4/4 setado acima
            });

            if (photoSelected.canceled) { //se o usuario clicar, e depois voltar ou cancelar a seleção da imagem, essa variavbel/estado/whatever retornará true, dai teremos que tratar essa condicional retornando a função, pois nada será feito
                return
            }

            const photoURI = photoSelected.assets[0].uri; //posição 0 é um array com vários dados e metadados, entre esses dados tem o uri e a imagem;

            if (photoURI) {
                const photoInfo = await FileSystem.getInfoAsync(photoURI) as {
                    size: number
                };

                if (photoInfo.size && (photoInfo.size / 1024 / 1024 > 1)) { //verifica tamanho da imagem e retorna se exceder.
                    return toast.show({ //quando a gente chama a função toast, aparentemente ele gera uma id que usamos para passar pro nosso componente personalizado (ToastMessage)(passamos ele na propriedade id apenas para constar, mas não tem função aparante na função de toast.close(id), pois ele quem vai fechar o toast quando clicarmos no 'x' customizado que criamos)
                        placement: "top",
                        render: ({ id }) => (
                            <ToastMessage id={id} action="error" title="Essa imagem é muito grande. Escolha uma de até 5MB." onClose={() => toast.close(id)} />
                        )
                    })
                    // return Alert.alert("Essa imagem é muito grande. Escolha uma até 5MB.")
                }

                setUserPhoto(photoURI) //adiciona a uri criada da foto carregada no estado que está sendo usado para exibição na screen
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setUpdating(true);

            await api.put("/users", data) //interessante manter os nomes iguais aos do backend porque aí jogamos apenas o objeto e tudo já acontece

            const userUpdated = user;
            userUpdated.name = data.name;

            await updateUserProfile(userUpdated);

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="success" title="Dados atualizados com sucesso." onClose={() => toast.close(id)} />
                )
            })

            console.log(data)
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível atualizar os dados de cadastro."

            toast.show({
                placement: "top",
                render: ({ id }) => (
                    <ToastMessage id={id} action="error" title={title} onClose={() => toast.close(id)} />
                )
            })

        } finally {
            reset({
                name: user.name,
                old_password: "",
                password: "",
                confirm_password: ""
            })

            setUpdating(false);
        }

    }

    return (
        <VStack className="flex-1">
            <ScreenHeader title="Perfil" />
            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>

                <Center className="mt-6 px-10">
                    <TouchableOpacity className="mb-8" onPress={handleUserPhotoSelect}>
                        <View className="items-center">
                            <UserPhoto source={{ uri: userPhoto }} alt="User picture" size="xl" className="rounded-full border-2 border-gray-400 bg-gray-400" />
                            <Text className="text-green-500 font-heading text-md mt-2 ">Alterar Foto</Text>
                        </View>
                    </TouchableOpacity>

                    <Center className="w-full gap-4">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder="Nome" onChangeText={onChange} value={value} errorMessage={errors.name?.message} autoCapitalize="words" className="text-gray-200 bg-gray-600" />
                            )}
                        />

                        <Input value={user.email} placeholder="E-mail" keyboardType="email-address" className="text-gray-200 bg-gray-600" isReadOnly />

                    </Center>

                    <Heading className="self-start font-heading text-gray-200 text-md mt-12 mb-2">Alterar senha</Heading>

                    <Center className=" w-full gap-4">
                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange, value } }) => (
                                <Input placeholder="Senha antiga" onChangeText={onChange} value={value} errorMessage={errors.old_password?.message} className="text-gray-200 bg-gray-600" secureTextEntry />
                            )}
                        />
                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input placeholder="Nova antiga" onChangeText={onChange} value={value} errorMessage={errors.password?.message} className="text-gray-200 bg-gray-600" secureTextEntry />
                            )}
                        />
                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange, value } }) => (
                                <Input placeholder="Confirme a nova senha" onChangeText={onChange} value={value} errorMessage={errors.confirm_password?.message} className="text-gray-200 bg-gray-600" secureTextEntry />
                            )}
                        />
                        <Button title="Atualizar" onPress={handleSubmit(handleProfileUpdate)} />
                    </Center>

                </Center>
            </ScrollView>
        </VStack>
    )
}