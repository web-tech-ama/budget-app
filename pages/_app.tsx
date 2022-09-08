import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import {AuthContextProvider} from "@/context/AuthUserContext";
import {useRouter} from "next/router";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Layout from "@/components/layout/layout";
import {supaBase} from "@/utils/supabaseClient";

const noAuthRequired = ['/', '/login', '/signup']
function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()

  return (



      <AuthContextProvider supabaseClient={supaBase}>

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
