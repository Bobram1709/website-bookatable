import showImage from "@/utils/fileHelper.js";
import Image from "next/image";
import styles from "./OrderCard.module.css";

export default function OrderCard({ data }) {
  return (
    <div className="flex items-center gap-x-4 rounded bg-primary-secondary-2 px-4 py-1">
      {/* left */}
      <div className="text-center lg:w-[30%]">
        <Image
          width={200}
          height={200}
          src={showImage(data?.menu?.image)}
          alt="cart food item pic"
          className="mb-2 block w-full"
        />
        <h4 className="font-bold text-primary-white">{data?.menu?.name}</h4>
      </div>

      {/* right */}
      <div className="lg:w-[60%]">
        <table className={styles.cardCardTable}>
          <tbody className="font-kumbh-sans text-primary-white">
            <tr className={styles.cartCardTr}>
              <td>Order Quantity</td>
              <td>{data?.quantity}</td>
            </tr>
            <tr className={styles.cartCardTr}>
              <td>Amount</td>
              <td>{data?.amount}</td>
            </tr>
            {/* <tr className={styles.cartCardTr}>
              <td>Order Date</td>
              <td>2 June 2024</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
