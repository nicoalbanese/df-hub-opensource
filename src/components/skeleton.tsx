import { FolderIcon, MagnifyingGlassIcon, PhoneIcon, PlusIcon } from "@heroicons/react/24/outline";

const HomeSkeleton = () => {
  return (
    <>
      <div className="mb-4 flex animate-pulse justify-between border-b border-slate-500 py-4">
        <div className="h-10 w-2/5 rounded-lg bg-gray-600"></div>
        <div className="h-10 w-1/6 rounded-lg bg-gray-600"></div>
      </div>
      <div className="mb-4 flex animate-pulse justify-between">
        <div className="h-10 w-2/6 rounded-lg bg-gray-600"></div>
        <div className="h-10 w-1/5 rounded-lg bg-gray-600"></div>
      </div>
      <div className="pointer-none animate-pulse">
        <div className="mb-2 h-10 w-full rounded-lg border-b border-b-slate-600 pb-2">
          <div className="flex blur-sm">
            <FolderIcon height={25} className="mr-4" />
            <span className="">Pipelines</span>
          </div>
        </div>
        <div className="mb-2 h-10 w-full rounded-lg border-b border-b-slate-600 pb-2">
          <div className="flex blur-sm">
            <PlusIcon height={25} className="mr-4" />
            <span className="">New Company</span>
          </div>
        </div>
        <div className="mb-2 h-10 w-full rounded-lg border-b border-b-slate-600 pb-2">
          <div className="flex blur-sm">
            <PhoneIcon height={25} className="mr-4" />
            <span className="">New Note</span>
          </div>
        </div>
        <div className="mb-2 h-10 w-full rounded-lg border-b border-b-slate-600 pb-2">
          <div className="flex blur-sm">
            <MagnifyingGlassIcon height={25} className="mr-4" />
            <span className="">Triage Website Applications</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomeSkeleton;
