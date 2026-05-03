"use client";
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import axios from "axios";
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
  const { loading, zaps } = useZaps();

  return (
    <>
      <Appbar />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <div className="flex justify-between pr-8">
            <div className="text-2xl font-bold">My Zaps</div>
            <DarkButton onClick={() => {}}>Create Zap</DarkButton>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="pt-4 flex justify-center">"Loading"</div>
      ) : (
        <ZapTable zaps={zaps} />
      )}
    </>
  );
};

function ZapTable({ zaps }: { zaps: Zap[] }) {
  return <></>;
}

export default dashBoard;
