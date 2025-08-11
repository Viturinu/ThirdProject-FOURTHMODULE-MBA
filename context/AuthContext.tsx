import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/services/api";
import { createContext, ReactNode, useState } from "react";

export type AuthContextDataProps = { //tipando para colocarmos como modelo do nossoc contexto
    user: UserDTO; //UserDTO é um tipo genṕerico de user, pois usaremos em toda nossa aplicação.
    handleSignIn: (email: string, password: string) => Promise<void>;
}

type AuthContextProviderProps = { //essa tipagem é essencial para passarmos pro nosso provider do contexto, pois precisamos do children para englobar tudo que queremos dentro desse contexto.
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps); //criamos o contexto

export function AuthContextProvider({ children }: AuthContextProviderProps) { //criamos o provider, pois faz sentido ter os dois na mesma tela, tanto provider quanto o contexto, de fato.

    const [user, setUser] = useState<UserDTO>({
        // id: "1",
        // name: "Victor",
        // email: "victor.almeida.ti@gmail.com",
        // avatar: "victor.png"
    } as UserDTO)

    async function handleSignIn(email: string, password: string) {
        try { //sempre que trabalha com requisições é uma boa pratica envolver com try/catch pra buscar exceções 
            const { data: { user } } = await api.post("/sessions", { email, password }); //essa requisição 'post' é assincrona, por isso o async ali em cima
            setUser({
                id: user.id,
                name: user.name,
                avatar: user.avatar == null ? "" : user.avatar,
                email: user.email
            })
            console.log(user);

        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, handleSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}