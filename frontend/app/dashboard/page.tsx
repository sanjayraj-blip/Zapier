"use client";
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import LinkButton from "@/components/buttons/LinkButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";

interface Zap {
  id: string;
  triggerId: string;
  userId: number;
  actions: {
    id: string;
    zapId: string;
    actionId: string;
    sortingOrder: number;
    type: {
      id: string;
      name: string;
      image: string;
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
      image: string;
    };
  };
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/zap`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setZaps(res.data.zaps);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    zaps,
  };
}

const dashBoard = () => {
  const router = useRouter();
  const { loading, zaps } = useZaps();

  return (
    <>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton
              onClick={() => {
                router.push("/zap/create");
              }}
            >
              Create Zap
            </DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="pt-4 flex justify-center">"Loading"</div>
      ) : (
        <div className="flex justify-center w-full">
          <ZapTable zaps={zaps} />
        </div>
      )}
    </>
  );
};

function ZapTable({ zaps }: { zaps: Zap[] }) {
  const router = useRouter();
  return (
    <div className="p-8 max-w-screen-lg w-full">
      <div className="flex font-bold mb-4 items-center">
        <div className="w-32">Name</div>
        <div className="flex-1">Id</div>
        <div className="flex-1">Created At</div>
        <div className="flex-1">Webhook URL</div>
        <div className="w-20 text-center">Go</div>
      </div>
      {zaps.map((z) => (
        <div key={z.id} className="flex border-b pt-4 pb-4 items-center">
          <div className="w-32 flex">
            <img
              src={z.trigger.type.image}
              className="w-[30px]"
              alt="trigger"
            />
            {z.actions.map((x) => (
              <img key={x.id} src={x.type.image} width={30} alt="action" />
            ))}
          </div>
          <div className="flex-1">{z.id}</div>
          <div className="flex-1">Nov 13,2026</div>
          <div className="flex-1">{`${HOOKS_URL}/catch/1/${z.id}`}</div>
          <div className="w-20 flex justify-center">
            <LinkButton
              onClick={() => {
                router.push("/zap/" + z.id);
              }}
            >
              Go
            </LinkButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default dashBoard;
