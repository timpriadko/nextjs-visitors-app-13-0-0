"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { lora, sourceCodePro700 } from "../../styles/fonts/fonts";
import type { Metadata } from "next";
import getVisitorsData, {
  singleVisitorDataInterface,
  visitorsDataInterface,
} from "../../utils/visitorsDataFetch";
import ContactUsForm from "../../components/molecules/ContactUsForm/ContactUsFrom";
import cx from "classnames";
import Loading from "../../components/atoms/Loading/Loading";

import styles from "./board.module.scss";

export const metadata: Metadata = {
  title: "Board page with Visitors",
  description: "Welcome to Next.js",
};

export default function BoardPage() {
  const [visitorsData, setVisitorsData] = useState<
    singleVisitorDataInterface[]
  >([]);

  async function fetchVisitors() {
    try {
      const data: visitorsDataInterface = await getVisitorsData();
      return data;
    } catch (error) {
      // Handle errors
    }
  }

  useEffect(() => {
    const fetchedVisitors = fetchVisitors().then(function (
      fetchedVisitorsData
    ) {
      setVisitorsData(fetchedVisitorsData?.data);
    });

    // todo - rm
    console.log("BoardPage", {
      fetchedVisitors,
      env: process.env.HOST,
    });
  }, []);

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loading />}>
        <div className={styles.wrapper}>
          {visitorsData?.length &&
            visitorsData.map((visitor) => (
              <Link
                href={`visitors/${visitor.id}`}
                key={visitor.id}
                className={cx(styles.card, "ps-3 pe-3", {
                  [styles.card__odd]: +visitor.id % 2 === 1,
                })}
              >
                <div className={cx(styles.cardWrapper)}>
                  <Image
                    key={visitor.id}
                    src={visitor.avatar}
                    alt={`${visitor.first_name} ${visitor.last_name} avatar`}
                    width={50}
                    height={50}
                  />

                  <h3
                    style={lora.style}
                  >{`${visitor.first_name} ${visitor.last_name}`}</h3>
                  {+visitor.id % 2 === 1 ? (
                    <div className={sourceCodePro700.className}>
                      <span>{`${visitor.email}`}</span>
                    </div>
                  ) : (
                    <p className={sourceCodePro700.className}>
                      {`${visitor.email}`}
                    </p>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </Suspense>
      <div className='mt-14 flex justify-center flex-col items-center'>
        <h3 className='font-medium text-xl'>
          If You have any questions You can contact us
        </h3>

        <Suspense fallback={<Loading />}>
          <div className='mt-4 w-full'>
            <ContactUsForm />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
