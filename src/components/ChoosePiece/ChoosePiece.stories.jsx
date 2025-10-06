import { useState } from "react";
import ChoosePiece from "./ChoosePiece";
import React from "react";
export default {
  title: "Components/ChoosePiece",
  component: ChoosePiece,
};

export const BothPlayers = () => {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  return (
    <div style={{ display: "flex", gap: "3rem" }}>
      <div>
        <h3>Spelare 1</h3>
        <ChoosePiece value={p1} onChange={setP1} lockOnFirstChoice />
        {p1 && <p style={{ marginTop: "0.5rem" }}>Du har valt {p1 === "white" ? "vit" : "svart"} pjäs</p>}
      </div>

      <div>
        <h3>Spelare 2</h3>
        <ChoosePiece
          value={p2}
          onChange={setP2}
          disableWhite={p1 === "white"}
          disableBlack={p1 === "black"}
        />
        {p2 && <p style={{ marginTop: "0.5rem" }}> Du har valt {p2 === "white" ? "vit" : "svart"} pjäs</p>}
      </div>
    </div>
  );
};
