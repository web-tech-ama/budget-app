import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import {AuthContextProvider} from "@/context/AuthUserContext";
import {useRouter} from "next/router";
import ProtectedRoute from "@/utils/ProtectedRoute";
import NavUi from "@/components/ui/navUI/navUi";
import Layout from "@/components/layout/layout";

const noAuthRequired = ['/', '/login', '/signup']
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

  return (
      <AuthContextProvider>

          {noAuthRequired.includes(router.pathname) ? (
              <Layout>
              <Component {...pageProps} />
              </Layout>
          ) : (
              <Layout>
              <ProtectedRoute>
                  <Component {...pageProps} />
              </ProtectedRoute>
              </Layout>
          )}
      </AuthContextProvider>
  )
}

export default MyApp
