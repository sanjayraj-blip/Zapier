"use client";
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import LinkButton from "@/components/buttons/LinkButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

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
    };
  }[];
  trigger: {
    id: string;
    zapId: string;
    triggerId: string;
    type: {
      id: string;
      name: string;
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
      <div className="flex">
        <div className="flex-1">Name</div>
        <div className="flex-1">Id</div>
        <div className="flex-1">Created At</div>
        <div className="flex-1">Go</div>
      </div>
      <tbody>
        {zaps.map((z) => (
          <div className="flex border-b pt-4">
            <div className="flex-1">
              {z.trigger.type.name} {z.actions.map((x) => x.type.name + " ")}
            </div>
            <div className="flex-1">{z.id}</div>
            <div className="flex-1">Nov 13,2026</div>
            <div className="flex-1">
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
      </tbody>
    </div>
  );
}

export default dashBoard;
