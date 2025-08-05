export default function ServerLocation({ city, region }: { city: string; region: string }) {
  return (
    <p className="flex items-center">
      {region && <span className="after:content-['-'] after:mx-1 last:after:hidden">{region}</span>}
      {city && <span>{city}</span>}
    </p>
  );
}
