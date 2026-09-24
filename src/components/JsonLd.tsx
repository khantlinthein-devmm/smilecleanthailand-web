import { graph } from "@/lib/schema";

/** Renders schema.org nodes as one JSON-LD script tag. */
export default function JsonLd({ nodes }: { nodes: object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: graph(...nodes) }} />;
}
