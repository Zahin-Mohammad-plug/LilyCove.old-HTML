export default function SeriesCards({ params }) {
  const { seriesId } = params;

  return (
    <div>
      <h1>Series Cards for {seriesId}</h1>
      <p>This page will list all cards in the series.</p>
    </div>
  );
}
