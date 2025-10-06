import React from "react";
import PropTypes from "prop-types";
import styles from "./ChoosePiece.module.css";

export default function ChoosePiece({
  value,                    
  onChange,                 
  options = [
    { id: "yellow", label: "Gul", icon: "🟡" },
    { id: "red",    label: "Röd", icon: "🔴" },
  ],
  disabled = false,
  lockOnFirstChoice = false,
  disableIds = [],         
}) {
  const handleClick = (id) => {
    if (disabled) return;
    if (lockOnFirstChoice && value) return;
    if (disableIds.includes(id)) return;
    onChange?.(id);
  };

  return (
    <div className={styles.container}>
      {options.map((opt) => {
        const isActive = value === opt.id;
        const isDisabled =
          disabled || disableIds.includes(opt.id) || (lockOnFirstChoice && !!value);

        return (
          <button
            key={opt.id}
            type="button"
            className={`${styles.btn} ${isActive ? styles.active : ""}`}
            aria-pressed={isActive}
            onClick={() => handleClick(opt.id)}
            disabled={isDisabled}
            title={opt.label}
          >
            <span style={{ marginRight: 6 }}>{opt.icon}</span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

ChoosePiece.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ),
  disabled: PropTypes.bool,
  lockOnFirstChoice: PropTypes.bool,
  disableIds: PropTypes.arrayOf(PropTypes.string),
};
