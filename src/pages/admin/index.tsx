import { type User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const AdminPanel = () => {
  const { data: users, status } = trpc.admin.getUsers.useQuery();
  const { data: authStatus, status: authDataStatus } =
    trpc.auth.getAuthStatus.useQuery();

  const router = useRouter();

  useEffect(() => {
    if (authStatus?.admin == false) {
      router.push("/");
    }
  });

  if (authDataStatus == "loading") {
    return <></>;
  } else {
    if (authStatus?.admin) {
      return (
        <div>
          <Link href="/" className="my-2 inline-block hover:underline">
            back
          </Link>
          <h1>Admin Panel</h1>
          {status == "loading" && <>loading...</>}
          {status == "success" && (
            <>
              <p className="my-6">
                Using the panel below, you can approve and remove users that
                have signed up to use your app. Note the default state is{" "}
                <strong>not approved</strong>.
              </p>
              <div className="mt-4 overflow-hidden bg-white shadow sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <li key={user.id} className="px-4 py-4 sm:px-6">
                      <User user={user} />
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      );
    } else {
      return <></>;
    }
  }
};

export default AdminPanel;

const User = ({ user }: { user: User }) => {
  const utils = trpc.useContext();
  const authStatusMutation = trpc.admin.updateApprovalStatus.useMutation({
    onSuccess: () => {
      utils.admin.getUsers.refetch();
    },
  });

  const handleAuthStatusChange = (newStatus: boolean) => {
    console.log(user.name, newStatus);
    authStatusMutation.mutate({ id: user.id, newApprovalStatus: newStatus });
  };
  return (
    <div className="flex items-center justify-between text-slate-900">
      <div>
        <h4 className="font-bold">{user.name}{user.admin && " (you)"}</h4>
        <p className="text-slate-400">{user.email}</p>
      </div>
      <div>
        {user.admin ? (
          <span className="pr-4 font-light text-slate-500">admin</span>
        ) : (
          <>
            {user.approved ? (
              <button
                onClick={() => handleAuthStatusChange(false)}
                className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                remove
              </button>
            ) : (
              <button
                onClick={() => handleAuthStatusChange(true)}
                className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                approve
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
