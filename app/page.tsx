import Image from "next/image";

export default function Home() {
  return (
    <main className="flex">
      <div className="md:container md:mx-auto py-24 prose">
        <h1>Project title</h1>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">OPENAI API KEY</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text">OPENAI API SECRET</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
      </div>
    </main>
  );
}
