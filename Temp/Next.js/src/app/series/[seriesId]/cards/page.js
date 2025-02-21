export default function SetCards({ params }) {
  const { setId } = params;

  return (
    <div>
      <h1>Set Cards for {setId}</h1>
      <p>This page will list all cards in the set.</p>
    </div>
  );
}
