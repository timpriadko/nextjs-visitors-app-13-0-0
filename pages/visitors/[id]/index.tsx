import { useEffect, useState } from "react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { lora, sourceCodePro700 } from "../../../styles/fonts/fonts";
import Email from "../../../public/assets/email.svg";

import { singleVisitorDataInterface } from "../../../utils/visitorsDataFetch";
import { useParams } from "next/navigation";
import styles from "./visitors.module.scss";

type Props = {
  params: { id: string };
};

// Dynamic metadata
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;

  const singleDataItem = await getDataItem(id);
  const visitorsData = singleDataItem.data;

  return {
    title: `${visitorsData.first_name} ${visitorsData.last_name}`,
    description: "Single Visitor page description",
    openGraph: {
      title: `${visitorsData.first_name} ${visitorsData.last_name}`,
      description: "Single Visitor page description",
      images: [
        {
          url: `${visitorsData.avatar}`,
          width: 50,
          height: 50,
        },
      ],
    },
  };
}

async function getDataItem(id) {
  const res = await fetch(`https://reqres.in/api/users/${id}`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function VisitorPage() {
  const params = useParams();
  const id = params?.id;
  const [visitorData, setVisitorData] = useState<singleVisitorDataInterface>({
    id: 0,
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      const fetchedVisitor = getDataItem(id).then(function (
        fetchedVisitorData
      ) {
        setVisitorData(fetchedVisitorData?.data);
      });

      // todo - rm
      // console.log("BoardPage", {
      //   fetchedVisitor,
      // });
    }
  }, [id]);

  useEffect(() => {
    console.log("getId", { id: params?.id, visitorData });
  }, [params, visitorData]);

  return (
    <>
      <h1>Hello, {id}!</h1>
      {visitorData && (
        <div>
          <Image
            key={visitorData?.id}
            src={visitorData.avatar}
            alt={`${visitorData.first_name} ${visitorData.last_name} avatar`}
            width={50}
            height={50}
          />

          <h3
            style={lora.style}
          >{`${visitorData.first_name} ${visitorData.last_name}`}</h3>
          <p className={(sourceCodePro700.className, styles.email)}>
            <Email />
            <span>{`${visitorData.email}`}</span>
          </p>
        </div>
      )}
    </>
  );
}
