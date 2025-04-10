import showImage from "@/utils/fileHelper.js";
import Image from "next/image";
import styles from "./CartCard.module.css";

export default function CartCard({ data, bookingId, totalAmount }) {
  console.log(data);
  return (
    <div className="flex items-center gap-x-5 rounded bg-primary-secondary-2 px-10 py-6">
      {/* left */}
      <div className="text-center lg:w-[15%]">
        <Image
          height={200}
          width={200}
          src={showImage(data?.menuImage ?? data?.menu?.image)}
          alt="cart food item pic"
          className="mb-2 block w-full rounded-lg"
        />
        <h4 className="font-bold text-primary-white">{data?.menuName}</h4>
      </div>

      {/* right */}
      <div className="mb-8 lg:w-[70%]">
        <table className={styles.cardCardTable}>
          <tbody className="font-kumbh-sans text-primary-white">
            <tr className={`${styles.cartCardTr}`}>
              <td>Order Quantity</td>
              <td>{data?.quantity}</td>
            </tr>
            <tr className={styles.cartCardTr}>
              <td>Amount</td>
              <td>Rs {data?.amount}</td>
            </tr>
            {/* <tr className={styles.cartCardTr}>
              <td>Payment Status</td>
              <td>
                {data?.status[0].toUpperCase() +
                  data?.status?.slice(1, data?.status?.length)}
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
