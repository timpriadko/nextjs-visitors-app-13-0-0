import Link from "next/link";

export default function Page() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <Link href={`/board`}>
        <h2 className='font-bold text-3xl text-black-500 group-hover:text-gray-50'>
          Go to board
        </h2>
      </Link>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { lora, sourceCodePro700 } from "../styles/fonts/fonts";
// import type { Metadata } from "next";
// import getVisitorsData from "../utils/visitorsDataFetch";
// import ContactUsForm from "../components/molecules/ContactUsForm/ContactUsFrom";
// import cx from "classnames";
// import { Suspense } from "react";
// import Loading from "../components/atoms/Loading/Loading";

// import styles from "./home.module.scss";

// export const metadata: Metadata = {
//   title: "Board page with Visitors",
//   description: "Welcome to Next.js",
// };

// export default async function Page({ params }) {
//   // const { slug } = params;

//   const data = await getVisitorsData();
//   const visitorsData = data.data;

//   console.log("Page", {
//     visitorsData,
//     env: process.env.HOST,
//   });

//   return (
//     <div className={styles.container}>
//       {/* <h1>{`Hello${!!slug ? `, ${slug}!` : "!"}`}</h1> */}

//       <Suspense fallback={<Loading />}>
//         <div className={styles.wrapper}>
//           {visitorsData.length &&
//             visitorsData.map((visitor) => (
//               <Link
//                 href={`visitors/${visitor.id}`}
//                 key={visitor.id}
//                 // className={styles.card}
//                 className={cx(styles.card, "ps-3 pe-3", {
//                   [styles.card__odd]: +visitor.id % 2 === 1,
//                 })}
//               >
//                 <div className={cx(styles.cardWrapper)}>
//                   <Image
//                     key={visitor.id}
//                     src={visitor.avatar}
//                     alt={`${visitor.first_name} ${visitor.last_name} avatar`}
//                     width={50}
//                     height={50}
//                   />

//                   <h3
//                     style={lora.style}
//                   >{`${visitor.first_name} ${visitor.last_name}`}</h3>
//                   {+visitor.id % 2 === 1 ? (
//                     <div className={sourceCodePro700.className}>
//                       <span>{`${visitor.email}`}</span>
//                     </div>
//                   ) : (
//                     <p className={sourceCodePro700.className}>
//                       {`${visitor.email}`}
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             ))}
//         </div>
//       </Suspense>
//       <div className='mt-14 flex justify-center flex-col items-center'>
//         <h3 className='font-medium text-xl'>
//           If You have any questions You can contact us
//         </h3>

//         <Suspense fallback={<Loading />}>
//           <div className='mt-4 w-full'>
//             <ContactUsForm />
//           </div>
//         </Suspense>
//       </div>
//     </div>
//   );
// }
