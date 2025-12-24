interface Props {
  searches?: string[];
}

export const PreviousSearches = ({ searches }: Props) => {
  return (
    <div className="previous-searches">
      <h2>Busquedas recientes</h2>
      <ul className="previous-searches-list">
        {searches?.map((search) => (
          <li key={search}>{search}</li>
        ))}
      </ul>
    </div>
  );
};
