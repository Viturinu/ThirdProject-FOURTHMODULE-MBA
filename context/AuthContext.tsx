import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";
import { storageUserGet, storageUserRemove, storageUserSave } from "@/storage/storageUser";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = { //tipando para colocarmos como modelo do nossoc contexto
    user: UserDTO; //UserDTO é um tipo genṕerico de user, pois usaremos em toda nossa aplicação.
    SignIn: (email: string, password: string) => Promise<void>;
    SignOut: () => Promise<void>;
    isLoadingUserStorageData: boolean; //no momento da criação do contexto, quye é no inicio do app, ele já vai ficar em false pra carregar o loading enquanto o user ṕe carregado do storage
}

type AuthContextProviderProps = { //essa tipagem é essencial para passarmos pro nosso provider do contexto, pois precisamos do children para englobar tudo que queremos dentro desse contexto.
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps); //criamos o contexto

export function AuthContextProvider({ children }: AuthContextProviderProps) { //criamos o provider, pois faz sentido ter os dois na mesma tela, tanto provider quanto o contexto, de fato.

    const router = useRouter()

    const [user, setUser] = useState<UserDTO>({
        // id: "1",
        // name: "null",
        // email: "victor.almeida.ti@gmail.com",
        // avatar: "victor.png"
    } as UserDTO);
    const [isLoadingUserStorageData, setIsLoadingUserStorageData] = useState(true);

    async function SignIn(email: string, password: string) {
        try { //sempre que trabalha com requisições é uma boa pratica envolver com try/catch pra buscar exceções 
            const { data: { user } } = await api.post("/sessions", { email, password }); //essa requisição 'post' é assincrona, por isso o async ali em cima
            // setUser({
            //     id: user.id,
            //     name: user.name,
            //     avatar: user.avatar === null ? "" : user.avatar,
            //     email: user.email
            // })
            if (Object.keys(user).length !== 0) {
                setUser(user);
                storageUserSave(user);
            }
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    async function loadUserData() {
        try {
            const userLogged = await storageUserGet(); //busca se tem usuário já logado

            if (Object.keys(userLogged).length > 0) { //if(useLogged) vai sempre retornar true, pois só seria false se userLogged fosse null, undefined, 0, "" ou false — mas isso não acontece na sua função.
                setUser(userLogged); //seta o user carregado da memoria do storage
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false); //aqui eu posso fazer o finally, pois não terá vazamento de memoria com screens sendo destruidas e variaveis desalocadas
        }
    }

    async function SignOut() {
        try {
            setIsLoadingUserStorageData(true);
            setUser({} as UserDTO);
            await storageUserRemove();
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    useEffect(() => {
        Object.keys(user).length === 0 ? router.push("/sign-in") : router.push("/home") //foi preciso fazer isso, pois se chamar <Home> diretamente, ele vai dar problema com o carregamento do Layout, pois ele só carrega se for feito via rota do expo-router, não diretamente como estava sendo feito;
    }, [user])

    useEffect(() => {
        loadUserData();
    }, [])

    return (
        <AuthContext.Provider value={{ user, SignIn, SignOut, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}