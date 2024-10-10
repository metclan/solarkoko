import { EditAddress } from "./edit-address";

export const metadata = {
    "title": "Checkout - Edit Checkout Address",
    "keywords": [
      "checkout",
      "solar product checkout",
      "add address",
      "secure payment",
      "fast checkout",
      "solar energy shopping",
      "renewable energy purchase",
      "buy solar panels",
      "buy solar inverters",
      "solar product shopping"
    ],
    "author": "MetClan Technologies",
    "robots": "noindex, nofollow",
    "og": {
      "title": "Checkout - Secure Solar Product Purchase",
      "description": "Finalize your purchase of solar products. Our secure and hassle-free checkout process ensures quick and safe transactions. Join the renewable energy movement!",
    },
    "twitter": {
      "title": "Checkout - Add New Checkout Address",
      
    }
  }

type Props = {
    params: { addressId: string };
};

export default function CheckOutAddAddress ({ params} : Props) {
    return <EditAddress params = {params}/>
}