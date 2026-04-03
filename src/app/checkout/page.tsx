import Checkout from "@/components/organisms/Checkout";
import { getUserAddresses } from "@/lib/api";

export default async function CheckoutPage() {
  const savedAddresses = await getUserAddresses();

  return <Checkout initialAddresses={savedAddresses} />;
}