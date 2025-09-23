import "@/styles/globals.css";
import { BillingProvider } from "../context/billing-context";

export default function App({ Component, pageProps }) {
  return (
        <BillingProvider>
            <Component {...pageProps} />
        </BillingProvider>
    );
}
