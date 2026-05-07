"use client";

import { BACKEND_URL } from "@/app/config";
import Appbar from "@/components/Appbar";
import DarkButton from "@/components/buttons/DarkButton";
import LinkButton from "@/components/buttons/LinkButton";
import ZapCell from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAvailableTriggersAndActions() {
  const [loading, setLoading] = useState(true);
  const [triggers, setTriggers] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`${BACKEND_URL}/api/v1/trigger/available`),
      axios.get(`${BACKEND_URL}/api/v1/action/available`),
    ]).then(([triggerRes, actionRes]) => {
      setTriggers(triggerRes.data.availableTriggers);
      setActions(actionRes.data.availableActions);
      setLoading(false);
    });
  }, []);

  return {
    loading,
    triggers,
    actions,
  };
}

export default function () {
  const router = useRouter();
  const { loading, actions, triggers } = useAvailableTriggersAndActions();

  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [selectedActions, setSelectedActions] = useState<
    {
      index: number;
      availableActionId: string;
      availableActionName: string;
    }[]
  >([]);

  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(
    null,
  );

  if (loading) {
    return "Loading..";
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-end  pt-20 pr-40 bg-slate-200">
        <DarkButton
          onClick={async () => {
            if (!selectedTrigger?.id) {
              return;
            }
            const response = await axios.post(
              `${BACKEND_URL}/api/v1/zap`,
              {
                availabletriggerId: selectedTrigger.id,
                triggerMetaData: {},
                actions: selectedActions.map((a) => ({
                  availableactionId: a.availableActionId,
                  actionMetaData: {},
                })),
              },
              {
                headers: {
                  Authorization: localStorage.getItem("token"),
                },
              },
            );
            router.push("/dashboard");
          }}
        >
          Publish
        </DarkButton>
      </div>
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">
        <div className="flex justify-center w-full">
          <ZapCell
            onClick={() => {
              setSelectedModalIndex(1);
            }}
            name={selectedTrigger ? selectedTrigger.name : "Trigger"}
            index={1}
          />
        </div>
        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action) => (
            <div key={action.index} className="flex justify-center pt-2">
              <ZapCell
                onClick={() => {
                  setSelectedModalIndex(action.index);
                }}
                name={
                  action.availableActionName
                    ? action.availableActionName
                    : "Action"
                }
                index={action.index}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <LinkButton
            onClick={() => {
              setSelectedActions((a) => [
                ...a,
                {
                  index: a.length + 2,
                  availableActionId: "",
                  availableActionName: "",
                },
              ]);
            }}
          >
            <div className="text-2xl">+</div>
          </LinkButton>
        </div>
      </div>
      {selectedModalIndex && (
        <Modal
          availableItems={selectedModalIndex === 1 ? triggers : actions}
          onSelect={(props: null | { name: string; id: string }) => {
            if (props === null) {
              setSelectedModalIndex(null);
              return;
            }
            if (selectedModalIndex == 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name,
              });
            } else {
              setSelectedActions((a) => {
                let newActions = [...a];
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  availableActionId: props.id,
                  availableActionName: props.name,
                };
                return newActions;
              });
            }
            setSelectedModalIndex(null);
          }}
          index={selectedModalIndex}
        />
      )}
    </div>
  );
}

function Modal({
  index,
  onSelect,
  availableItems,
}: {
  index: number;
  onSelect: (props: null | { name: string; id: string }) => void;
  availableItems: { id: string; name: string; image: string }[];
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 md:pb-5 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Select {index === 1 ? "Trigger" : "Action"}
            </h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg text-sm w-9 h-9 inline-flex justify-center items-center transition"
              onClick={() => {
                onSelect(null);
              }}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="space-y-2 md:py-6">
            <p className="text-gray-700">
              Select a trigger for your automation:
            </p>
            <div className="space-y-2">
              {availableItems.map(({ id, name, image }) => {
                return (
                  <div
                    key={id}
                    onClick={() => onSelect({ id, name })}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition flex items-center gap-3"
                  >
                    <img src={image} width={30} alt={name} />
                    <div>{name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
