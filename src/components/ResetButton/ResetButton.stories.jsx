import ResetButton from "./ResetButton";

export default {
  title: "Components/ResetButton",
  component: ResetButton,
};

export const Default = {
  args: {
    label: "Starta Om",
    onClick: () => alert("Reset!"),
  },
};
