import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {AuthContextProvider} from "@/context/AuthUserContext";
import {useRouter} from "next/router";
import ProtectedRoute from "@/utils/ProtectedRoute";

const noAuthRequired = ['/', '/login', '/signup']
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    
  return (
      <AuthContextProvider>
          {noAuthRequired.includes(router.pathname) ? (
              <Component {...pageProps} />
          ) : (
              <ProtectedRoute>
                  <Component {...pageProps} />
              </ProtectedRoute>
          )}
      </AuthContextProvider>
  )
}

export default MyApp
