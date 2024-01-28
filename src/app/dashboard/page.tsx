import Link from "next/link";

export default async function Dashboard() {
  return (
    <div>
      <h1>dashboard</h1>
      <Link className="btn btn-info mt-4" href="/">
        戻る
      </Link>
    </div>
  );
}
