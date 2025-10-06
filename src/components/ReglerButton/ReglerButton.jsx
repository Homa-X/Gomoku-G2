import React, { useState } from "react";
import styles from "./ReglerButton.module.css";

const ReglerButton = ({ buttonLabel = "Regler" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.buttonContainer}>
        <button className={styles.reglerButton} onClick={() => setOpen(true)}>
          {buttonLabel}
        </button>
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.modalTitle}>Regler — Fem i rad</h2>
            <ul className={styles.modalList}>
              <li>Spelet spelas på ett rutnät 5×5.</li>
              <li>Två spelare turas om att lägga sina cirklar (●).</li>
              <li>Målet är att få 5 i rad – vågrätt, lodrätt eller diagonalt.</li>
              <li>Du får inte lägga på en ruta som redan är tagen.</li>
              <li>Den som först får 5 i rad vinner.</li>
            </ul>
            <button className={styles.closeButton} onClick={() => setOpen(false)}>
              Stäng
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReglerButton;