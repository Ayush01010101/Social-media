import type { User } from "@supabase/supabase-js";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import SupabaseClient from "../Instances/SupabaseClient";
import { useContext, createContext } from "react";
interface AuthContextType {
  User: undefined | User;
  SignInWithGoogle: () => void;
  Signout: () => void;

}

const AuthContext = createContext<undefined | AuthContextType>(undefined)

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const [User, setUser] = useState<undefined | User>(undefined)

  useEffect(() => {
    SupabaseClient.auth.getSession().then(({ data, error }) => {
      data && setUser(data.session?.user)
    })

    const { data: AuthListner } = SupabaseClient.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(undefined)
      }
    })

    return () => {
      AuthListner.subscription.unsubscribe()
    }
  }, [])
  const SignInWithGoogle = async () => {

    const { data, error } = await SupabaseClient.auth.signInWithOAuth({
      provider: "google"
    })

    if (data) {
      return data;
    }
    return error;
  }
  const Signout = () => {
    SupabaseClient.auth.signOut()

  }
  return (
    <>
      <AuthContext.Provider value={{ SignInWithGoogle, Signout, User }}>
        {children}
      </AuthContext.Provider>

    </>
  )

}

const useAuth = (): AuthContextType => {
  const usercontext = useContext(AuthContext)
  if (usercontext == undefined) {
    throw new Error('Use hook inside authcontext provider')
  }
  return usercontext;
}
export { useAuth }


export default AuthContextProvider
