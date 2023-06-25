import "bootstrap/dist/css/bootstrap.min.css"; // Import bootstrap CSS
import { ChakraProvider } from '@chakra-ui/react'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      	<Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;