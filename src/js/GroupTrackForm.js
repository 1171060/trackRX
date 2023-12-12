import React, { useState } from "react";
import { addGroupTrack } from "../indexedDB";

export default function GroupTrackForm() {
	const [trackName, setTrackName] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		addGroupTrack({ name: trackName });
	};
}
