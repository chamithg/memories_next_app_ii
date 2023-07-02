import MainPanel from "@/components/MainPanel";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col mt-5">
      <h1 className="head_text font-chewy text-center">
        Create, Save & Share <br className="max-md:" />
        <span className="orange_gradient text-center"> Memories</span>
      </h1>
      <p className="desc font-satoshi text-center">
        Memories is a online plafrom to create picure albums and share with your
        loved ones..
      </p>
      <MainPanel />
    </section>
  );
}
