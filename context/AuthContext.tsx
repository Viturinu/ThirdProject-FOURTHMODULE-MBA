import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@/storage/storageAuthToken";
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

    async function UserAndTokenUpdate(user: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true)

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`; //anexa o token na requisição http, mesma coisa que fazemos no React puro ou Next

            setUser(user); //definindo o user no contexto, pois aqui vai refletir pra todos
        } catch (error) {
            throw error; //esta jogando pro handleSignIn() tratar o erro
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function UserAndTokenSaveToStorage(user: UserDTO, token: string) {
        try {
            setIsLoadingUserStorageData(true);

            await storageUserSave(user); //aqui ele salva no async storage
            await storageAuthTokenSave(token); //armazenando no asyncstorage o token
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function SignIn(email: string, password: string) {
        setIsLoadingUserStorageData(true);

        try { //sempre que trabalha com requisições é uma boa pratica envolver com try/catch pra buscar exceções 

            const { data } = await api.post("/sessions", { email, password }); //essa requisição 'post' é assincrona, por isso o async ali em cima
            // setUser({
            //     id: user.id,
            //     name: user.name,
            //     avatar: user.avatar === null ? "" : user.avatar,
            //     email: user.email
            // })
            if (Object.keys(data.user).length !== 0) {
                await UserAndTokenSaveToStorage(data.user, data.token); //salva token e user no storage
                UserAndTokenUpdate(data.user, data.token); //atualiza o objeto user no contexto e token no sessão
            }
            console.log(user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false);
        }
    }

    async function loadUserData() {
        try {
            setIsLoadingUserStorageData(true);
            const userLogged = await storageUserGet(); //busca se tem usuário já logado
            const token = await storageAuthTokenGet(); //busca o token também do async storage

            if (Object.keys(userLogged).length > 0 && token) { //if(useLogged) vai sempre retornar true, pois só seria false se userLogged fosse null, undefined, 0, "" ou false — mas isso não acontece na sua função. //aqui está assim porque o userLogged vai retornar um objeto, seja preenchido ou não, mas o token posso verificar assim porque ele vai tentar buscar algo de lá, e se não achar pode retornar algo undefined
                UserAndTokenUpdate(userLogged, token); //atualiza sessão (cabeçalho) e user no contexto
            }
        } catch (error) {
            throw error;
        } finally {
            setIsLoadingUserStorageData(false); //aqui eu posso fazer o finally, pois não terá vazamento de memoria com screens sendo destruidas e variaveis desalocadas
        }
    }

    async function SignOut() {
        try {
            setIsLoadingUserStorageData(true); //esse status serve para atualizarmos com tela de loading na screen vigente
            setUser({} as UserDTO); //limpa o user da 'sessão'/async storage
            await storageUserRemove();
            await storageAuthTokenRemove();
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
    }, []) //se não colocassemos esse segundo parametro, deixando apenas a função no primeiro parametro do useEffect, ele executaria em QUALQUER RENDERIZAÇÃO, mas se colocarmos os colchetes sem nada ele vai renderizar apenas na primeira montagem do componente, independente de re-renderização

    return (
        <AuthContext.Provider value={{ user, SignIn, SignOut, isLoadingUserStorageData }}>
            {children}
        </AuthContext.Provider>
    )
}