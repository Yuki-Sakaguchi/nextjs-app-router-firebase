import Image from "next/image";

export default async function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Image
        className="mx-auto mb-3"
        src="/Todolist-cuate.svg"
        alt=""
        width="400"
        height="400"
        priority={true}
      />
    </div>
  );
}
