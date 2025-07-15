import Link from "next/link";

export default function Home() {
  return (
    <ul className="space-y-4">
      <li className="p-2 bg-travel-primary100 text-white">
        <Link href="/components/njs">남주성</Link>
      </li>
      <li className="p-2 bg-travel-primary100 text-white">
        <Link href="/components/msi">문서인</Link>
      </li>
      <li className="p-2 bg-travel-primary100 text-white">
        <Link href="/components/psy">박선영</Link>
      </li>
      <li className="p-2 bg-travel-primary100 text-white">
        <Link href="/components/sah">송아현</Link>
      </li>
      <li className="p-2 bg-travel-primary100 text-white">
        <Link href="/components/chj">차형주</Link>
      </li>
    </ul>
  );
}
