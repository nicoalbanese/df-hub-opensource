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
        <h4 className="font-bold">
          {user.name}
          {user.admin && " (you)"}
        </h4>
        <p className="text-slate-400">{user.email}</p>
      </div>
      <div>
        {user.admin ? (
          <span className="pr-4 font-light text-slate-500">admin</span>
        ) : (
          <>
            {user.approved ? (
              <>
                {authStatusMutation.status == "loading" ? (
                  <LoadingIndicator />
                ) : (
                  <button
                    onClick={() => handleAuthStatusChange(false)}
                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    remove
                  </button>
                )}
              </>
            ) : (
              <>
                {authStatusMutation.status == "loading" ? (
                  <LoadingIndicator />
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
          </>
        )}
      </div>
    </div>
  );
};

const LoadingIndicator = () => {
  return (
    <svg
      aria-hidden="true"
      className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  );
};
