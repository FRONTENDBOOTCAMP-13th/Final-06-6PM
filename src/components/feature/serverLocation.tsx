export default function ServerLocation({
  city,
  region,
}: {
  city: string;
  region: string;
}) {
  return (
    <>
      <span>{region ? `${region}, ` : ""}</span>
      <span>{city}</span>
    </>
  );
}
