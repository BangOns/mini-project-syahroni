import CardFeedback from "./CardFeedback";

export default function Feedback({ dataFeedback, pelajaran }) {
  const filterFeedbackByPelajaran = dataFeedback?.filter(
    (items) => items.pelajaran === pelajaran
  );
  return (
    <article className="w-full pt-28">
      <hr className="w-full h-[2px] bg-black/60" />
      <header className="w-full flex justify-between pt-[19px]">
        <h1 className="text-xl sm:text-2xl font-medium">Feedback</h1>
      </header>
      <section className="w-full flex flex-wrap  xl:grid xl:grid-cols-3 mb-3 gap-[35px] pt-[18px]">
        {filterFeedbackByPelajaran?.map((items, i) => (
          <CardFeedback key={i} {...items} />
        ))}
      </section>
    </article>
  );
}
