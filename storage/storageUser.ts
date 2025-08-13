import { UserDTO } from "@/dtos/UserDTO";
import { USER_STORAGE } from "./storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storageUserSave(user: UserDTO) {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user)) //USER_STORAGE = "@gymignite:user";
}

export async function storageUserGet() {
    const storage = await AsyncStorage.getItem(USER_STORAGE); //USER_STORAGE = "@gymignite:user";
    const user: UserDTO = storage ? JSON.parse(storage) : {};

    return user;
}