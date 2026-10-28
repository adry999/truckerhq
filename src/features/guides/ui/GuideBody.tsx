import Link from "next/link";
import type { GuideBlock, GuideBodyData } from "@/features/guides/data/guide-body";
import { FaqList } from "@/shared/ui/FaqList";

const P = "text-base leading-relaxed text-[#3F444B]";

/** Turns [label](/internal-path) into a Next link; everything else stays text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^\[([^\]]+)\]\((\/[^)\s]*)\)$/.exec(part);
        return m ? (
          <Link key={i} href={m[2]} className="font-bold text-asphalt underline">
            {m[1]}
          </Link>
        ) : (
          part
        );
      })}
    </>
  );
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className={P}>
          <Inline text={block.text} />
        </p>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={`${P} flex flex-col gap-1.5 pl-6 ${block.ordered ? "list-decimal" : "list-disc"}`}
        >
          {block.items.map((item) => (
            <li key={item}>
              <Inline text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border-[1.5px] border-border">
          <table className="w-full min-w-[480px] border-collapse text-left text-base">
            <thead className="bg-[#EEEFEC]">
              <tr>
                {block.head.map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-display font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-border align-top">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-4 py-3 font-bold">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className={`${P} px-4 py-3`}>
                        <Inline text={cell} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <div className="rounded-lg border-[1.5px] border-border bg-white p-6">
          <p className="font-display text-xl font-extrabold leading-snug">
            <Inline text={block.text} />
          </p>
        </div>
      );
  }
}

export function GuideBody({ body, draft }: { body: GuideBodyData; draft: boolean }) {
  return (
    <article className="flex flex-col gap-5">
      {draft && (
        <div
          role="note"
          className="rounded-lg border-2 border-amber bg-amber/20 p-4 font-display text-lg font-extrabold uppercase tracking-[.05em]"
        >
          Draft — pending review
        </div>
      )}

      <p className="text-lg leading-relaxed">{body.summary}</p>

      {body.sections.map((section) => (
        <section key={section.heading} className="flex flex-col gap-5">
          <h2 className="font-display text-3xl font-extrabold">{section.heading}</h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </section>
      ))}

      {body.faqs.length > 0 && (
        <section className="flex flex-col gap-5">
          <h2 className="font-display text-3xl font-extrabold">Frequently asked questions</h2>
          <FaqList items={body.faqs} />
        </section>
      )}

      {body.sources.length > 0 && (
        <section className="flex flex-col gap-3">
          <h2 className="font-display text-3xl font-extrabold">Sources</h2>
          <ul className={`${P} flex list-disc flex-col gap-1.5 pl-6`}>
            {body.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} rel="noopener" className="font-bold text-asphalt underline">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
