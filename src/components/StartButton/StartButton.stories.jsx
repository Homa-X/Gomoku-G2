import {React } from 'react'
import StartButton from "./StartButton";

export default {
	title: 'Components/StartButton',
	component: StartButton,
}

export const Default = {
	args: {
			StartButtonText: "Starta spelet",
			onStart: () => alert("Spelet startade!"),
		},
	};
