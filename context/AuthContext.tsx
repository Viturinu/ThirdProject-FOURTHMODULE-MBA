import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useEffect, useState } from "react";

export type AuthContextDataProps = { //tipando para colocarmos como modelo do nossoc contexto
    user: UserDTO; //UserDTO é um tipo genṕerico de user, pois usaremos em toda nossa aplicação.
    SignIn: (email: string, password: string) => Promise<void>;
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
    } as UserDTO)

    console.log("Este é o objeto inicializando: " + JSON.stringify(user))

    async function SignIn(email: string, password: string) {
        try { //sempre que trabalha com requisições é uma boa pratica envolver com try/catch pra buscar exceções 
            const { data: { user } } = await api.post("/sessions", { email, password }); //essa requisição 'post' é assincrona, por isso o async ali em cima
            setUser({
                id: user.id,
                name: user.name,
                avatar: user.avatar === null ? "" : user.avatar,
                email: user.email
            })
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        Object.keys(user).length === 0 ? router.push("/sign-in") : router.push("/home") //foi preciso fazer isso, pois se chamar <Home> diretamente, ele vai dar problema com o carregamento do Layout, pois ele só carrega se for feito via rota do expo-router, não diretamente como estava sendo feito;
    }, [user])

    return (
        <AuthContext.Provider value={{ user, SignIn }}>
            {children}
        </AuthContext.Provider>
    )
}