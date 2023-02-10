/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useEffect, useState } from "react";

import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

import { trpc } from "../../utils/trpc";
import Link from "next/link";
import type { TriageCompany } from "../../utils/airtable";

const Triage = () => {
  const company = trpc.triage.getAll.useQuery();

  if (company.status === "loading") {
    return <>loading...</>;
  } else if (company.data.companies.length > 0) {
    return (
      <>
        <Header />
        {company.data?.companies && (
          <CompanyViewer company={company.data.companies[0] as TriageCompany} />
        )}
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div>No more companies!</div>
      </>
    );
  }
};

export default Triage;

const Header = () => {
  return (
    <div className="mb-4">
      <Link href="/">back</Link>
      <h1>Triage Inbound Pipeline</h1>
    </div>
  );
};

const CompanyViewer: React.FC<{ company: TriageCompany }> = ({
  company,
}: {
  company: TriageCompany;
}) => {
  // const { data: sessionData } = useSession();
  const utils = trpc.useContext();
  const sendOpinion = trpc.triage.sendOpinion.useMutation({
    onSuccess: () => utils.triage.getAll.refetch(),
  });

  const [commentValue, setCommentValue] = useState("");
  const [selectedDecision, setSelectedDecision] = useState("On the fence");

  useEffect(() => {
    console.log(selectedDecision);
  }, [selectedDecision]);
  const handleTriageSubmit = () => {
    sendOpinion.mutate({
      companyId: company.id,
      verdict: selectedDecision,
      comment: commentValue,
    });

    setCommentValue("");
  };

  return (
    <div className="flex w-full flex-col">
      <div className="">
        <div id="name" className="grid grid-cols-2">
          <DetailedSection sectionName="Company Name" body={company.name} />
          <DetailedSection
            sectionName="Open in Airtable"
            href={company.recordURL}
            isLink
            body=""
          />
        </div>
        <div className="grid grid-cols-2">
          <DetailedSection
            sectionName="Amount Raising"
            body={"£".concat(company.amountRaising.toLocaleString())}
          />
          {company.isFirstRound ? (
            <DetailedSection
              sectionName="First raise?"
              body={company.isFirstRound.toString()}
            />
          ) : (
            <DetailedSection
              sectionName=""
              body={""}
            />
          )}

          <DetailedSection
            sectionName="Description"
            body={company.description}
          />
          <DetailedSection sectionName="Problem" body={company.problem} />
        </div>
      </div>
      <div id="middle" className="w-full py-4">
        {company.deck.includes("https://dl.airtable.com/.attachments") ? (
          <iframe src={company.deck} width="100%" height="560px"></iframe>
        ) : (
          <div>
            This deck is hosted externally. Please{" "}
            <Link
              className="underline hover:opacity-75"
              target="_blank"
              href={company.deck}
            >
              click here
            </Link>{" "}
            to view this deck.
          </div>
        )}
      </div>
      <div
        id="bottom"
        className="mt-4 w-full border-t border-slate-500 py-4"
      >
        <h3>Thoughts</h3>
        <div className="my-0 flex w-full items-center justify-center">
          {sendOpinion.isLoading ? (
            <div className="opacity-70">submitting...</div>
          ) : (
            <div className="flex w-full flex-col">
              <DecisionRadioGroup
                selectedDecision={selectedDecision}
                setSelectedDecision={setSelectedDecision}
              />
              <TextArea
                value={commentValue}
                onChange={(e: any) => setCommentValue(e.target.value)}
              />
              {/* <textarea
                className="p-3 text-sm text-slate-900"
                placeholder="comments here..."
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              /> */}
              {/* <div className="flex items-center justify-center my-4">
                {BUTTON_OPTIONS.map((button) => (
                  <DecisionButton
                    key={button.buttonTitle}
                    button={button}
                    companyId={company.id}
                    comment={commentValue}
                  />
                ))}
                
              </div> */}
              <button
                type="button"
                className=" mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleTriageSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailedSection = ({
  sectionName,
  body,
  isLink = false,
  href = "",
}: {
  sectionName: string;
  body: string;
  isLink?: boolean;
  href?: string;
}) => {
  return (
    <div className="border-t border-b border-slate-500 py-2 pr-4">
      <h5 className="mb-1 text-xs font-bold uppercase text-slate-400">
        {sectionName}
      </h5>
      <p className="text-sm">
        {isLink ? (
          <Link href={href} className="cursor-pointer hover:opacity-75">
            open in airtable
          </Link>
        ) : (
          body
        )}
      </p>
    </div>
  );
};

type button = {
  buttonTitle: string;
  classes: string;
  decision: string;
};

type DecisionButtonProps = {
  button: button;
  companyId: string;
  comment: string;
};

const DecisionButton = ({
  button,
  companyId,
  comment,
}: DecisionButtonProps) => {
  const { buttonTitle, classes, decision } = button;

  const utils = trpc.useContext();
  const sendOpinion = trpc.triage.sendOpinion.useMutation({
    onSuccess: () => utils.triage.getAll.refetch(),
  });

  return (
    <>
      <button
        className={`mr-2 h-fit min-w-[85px] rounded-md border px-2.5 py-2 text-sm font-medium shadow-sm hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${classes}`}
        onClick={() =>
          sendOpinion.mutate({
            companyId: companyId,
            verdict: decision,
            comment: comment,
          })
        }
      >
        {buttonTitle}
      </button>
    </>
  );
};

function TextArea({ value, onChange }: { value: string; onChange: any }) {
  return (
    <div>
      <label
        htmlFor="comment"
        className="block text-sm font-light  text-gray-300"
      >
        Add a comment
      </label>
      <div className="mt-1">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          value={value}
          placeholder="comment..."
          onChange={onChange}
          className="block w-full rounded-md border-gray-300 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
}

const decisionOptions = [
  { id: 1, title: "Like", value: "Like" },
  { id: 2, title: "Dislike", value: "Dislike" },
  { id: 3, title: "Undecided", value: "On the fence" },
  // { id: 4, title: "Conduit", value: "Share with Conduit" },
  // { id: 5, title: "Life", value: "Share with Life Fund" },
  // { id: 6, title: "Fund III", value: "Share with Fund III" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function DecisionRadioGroup({ selectedDecision, setSelectedDecision }) {
  return (
    <RadioGroup value={selectedDecision} onChange={setSelectedDecision}>
      {/* <RadioGroup.Label className=" font-medium text-gray-300 text-sm">Decision</RadioGroup.Label> */}

      <div className="my-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-2">
        {decisionOptions.map((decision) => (
          <RadioGroup.Option
            key={decision.id}
            value={decision.value}
            className={({ checked, active }) =>
              classNames(
                checked ? "border-transparent" : "border-gray-300 opacity-50",
                active ? "border-indigo-500 ring-2 ring-indigo-500" : "",
                "relative flex cursor-pointer rounded-lg border bg-white p-3 shadow-sm focus:outline-none"
              )
            }
          >
            {({ checked, active }) => (
              <>
                <span className="flex flex-1">
                  <span className="flex flex-col">
                    <RadioGroup.Label
                      as="span"
                      className="block text-sm font-medium text-gray-900"
                    >
                      {decision.title}
                    </RadioGroup.Label>
                  </span>
                </span>
                <CheckCircleIcon
                  className={classNames(
                    !checked ? "invisible" : "",
                    "h-5 w-5 text-indigo-600"
                  )}
                  aria-hidden="true"
                />
                <span
                  className={classNames(
                    active ? "border" : "border-2",
                    checked ? "border-indigo-500" : "border-transparent",
                    "pointer-events-none absolute -inset-px rounded-lg"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
}
