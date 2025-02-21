export default function CardDetailPage({ params }) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">Card ID: {params.cardId}</h1>
        <p>Details for this card coming soon!</p>
      </div>
    );
  }
  