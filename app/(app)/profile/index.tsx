import { Button } from "@/components/mine/Button";
import { Input } from "@/components/mine/Input";
import { ScreenHeader } from "@/components/mine/ScreenHeader";
import { UserPhoto } from "@/components/mine/UserPhoto";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';


export default function Profile() {

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

            const photoURI = photoSelected.assets[0].uri; //posição 0 é um array com vários dados e metadados, entre esses dados tem a imagem;

            if (photoURI) {
                const photoInfo = await FileSystem.getInfoAsync(photoURI) as {
                    size: number
                };

                if (photoInfo.size && (photoInfo.size / 1024 / 1024 > 5)) { //verifica tamanho da imagem e retorna se exceder.
                    return Alert.alert("Essa imagem é muito grande. Escolha uma até 5MB.")
                }

                setUserPhoto(photoURI) //adiciona a uri criada da foto carregada no estado que está sendo usado para exibição na screen
            }
        } catch (error) {
            console.log(error);
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
                        <Input placeholder="Nome" className="bg-gray-600" />

                        <Input value="victor.almeida.ti@gmail.com" keyboardType="email-address" className="text-gray-200 bg-gray-600" isReadOnly />
                    </Center>

                    <Heading className="self-start font-heading text-gray-200 text-md mt-12 mb-2">Alterar senha</Heading>

                    <Center className=" w-full gap-4">
                        <Input placeholder="Senha antiga" className="bg-gray-600" secureTextEntry />
                        <Input placeholder="Nova antiga" className="bg-gray-600" secureTextEntry />
                        <Input placeholder="Confirme a nova senha" className="bg-gray-600" secureTextEntry />

                        <Button title="Atualizar" />
                    </Center>

                </Center>
            </ScrollView>
        </VStack>
    )
}