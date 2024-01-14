import { getUser } from "../api/getUser";

export default async function UserData() {
  const user = await getUser();
  const formattedString = JSON.stringify(user, null, "\t");
  if (user == null) {
    return null;
  }
  return (
    <div className="relative bg-gray-800 p-4 rounded-md shadow-md overflow-x-auto">
      <pre className="text-sm text-white font-mono">
        <code>{formattedString}</code>
      </pre>
    </div>
  );
}
