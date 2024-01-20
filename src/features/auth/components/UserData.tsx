import { getUser } from "../api/getUser";

export default async function UserData() {
  const user = await getUser();
  const formattedString = JSON.stringify(user, null, "\t");
  if (user == null) {
    return null;
  }
  return (
    <div className="relative overflow-x-auto rounded-md bg-gray-800 p-4 shadow-md">
      <pre className="font-mono text-sm text-white">
        <code>{formattedString}</code>
      </pre>
    </div>
  );
}
