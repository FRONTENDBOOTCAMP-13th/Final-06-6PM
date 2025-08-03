export default function ServerLocation({ city, region }: { city: string; region: string }) {
  return (
    <>
      {region && <span>{region}</span>}
      {city && <span>{city}</span>}
    </>
  );
}
