import type { User } from "@supabase/supabase-js";
import LoadingScreen from "../Components/LoadingScreen";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import SupabaseClient from "../Instances/SupabaseClient";
import LandingPage from "../Components/LandingPage";
import { useContext, createContext } from "react";

interface AuthContextType {
  User: undefined | User;
  SignInWithGoogle: () => void;
  Signout: () => void;

}

const AuthContext = createContext<undefined | AuthContextType>(undefined)

const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }): ReactNode => {
  const [User, setUser] = useState<undefined | User>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  useEffect(() => {
    SupabaseClient.auth.getSession().then(({ data, error }) => {
      if (data) {
        setUser(data.session?.user)
        setIsLoading(false)
      }
    })

    const { data: AuthListner } = SupabaseClient.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user)
        setIsLoading(false)
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
  if (isLoading) return <LoadingScreen />
  return (
    <>
      <AuthContext.Provider value={{ SignInWithGoogle, Signout, User }}>
        {User?.id ? children : <LandingPage />}
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
