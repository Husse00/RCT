import React, { useEffect, useState } from "react";
import "../style.css";

// definerar en type for datan med en interface.
interface Animal {
  id: string;
  name: string;
  shortDescription: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<Animal[] | null>(null);

  useEffect(() => {
    fetch("https://animals.azurewebsites.net/api/animals")
      .then((response) => response.json())
      .then((data: Animal[]) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Animal">
      <h1>Djur</h1>

      {data.map((d) => (
        <div key={d.id} className="animalbox">
          <p className="desc">{d.shortDescription}</p>
          <img src={d.imageUrl} width="240" alt={d.name}></img>
          <br></br>
          <br></br>
          <a className="link" href={`/animal/${d.id}`}>
            {d.name}{" "}
          </a>
          <br />
          <br />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};

export default Home;
