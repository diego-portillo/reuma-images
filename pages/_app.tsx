import { AppProps } from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import '../global.css'
import UserProvider from '@store/user';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
      </UserProvider>
  )
}

export default MyApp