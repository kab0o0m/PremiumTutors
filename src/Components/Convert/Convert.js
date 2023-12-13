import { useState } from "react";
import "./Convert.css";

const Convert = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState(null);
  const [textFormat, setTextFormat] = useState(null);

  // Convert to Json format first
  const convertToFormat = () => {
    //Split lines when there is a new line
    const lines = textInput.split("\n");
    // initiate client info object
    const clientInfo = {};

    lines.forEach((line) => {
      const match = line.match(/^\d+\.\s*(.+?)\s*:\s*(.*)$/);

      if (match) {
        // Extract key and value
        const [, key, value] = match;
        // Store each line heading and description as key and value
        clientInfo[key.trim()] = value.trim();
      }

      setTextFormat(JSON.stringify(clientInfo, null, 2));
    });
    const level = clientInfo["Level (Drop down)"];
    const subject = clientInfo["Subject (Drop down)"];
    const level_subject = level + " " + subject;
    const location = clientInfo["Postal Code"];
    const frequency = clientInfo["Frequency"]
      .split("/")
      .map((part) => part.trim());

    const duration =
      frequency[0] +
      "x " +
      clientInfo["Duration"].replace("hours", "hrs") +
      "/" +
      frequency[1];

    const timing = clientInfo["Timings"];
    const fees = "$40 - $50/hour Graduate/Full-time Tutors";
    const commission = `First ${parseInt(frequency[0]) * 2} lessons`;
    const remarks = clientInfo["Remarks"];

    const interested_applicants =
      "Interested applicants, please apply via https://forms.gle/KhPULcKSQGrNrPWo6 or message @PHTapplications";

    const application_form =
      "Application Form for Registered Tutors: https://forms.gle/VCuCj7Pkdm7kMRX49";

    setTextOutput(
      `${level_subject + " @ " + location}\n\n${"Details of assignment"}\n${
        "Location: " + location
      }\n${"Duration: " + duration}\n${"Timing: " + timing}\n\n${
        "Fees: " + fees
      }\n\n${commission}\n\n${remarks}\n\n${interested_applicants}\n\n${application_form}`
    );
  };

  return (
    <div className="convert">
      {/* Left section of the screen (input) */}
      <div className="convert-form">
        <textarea
          onChange={(e) => setTextInput(e.target.value)}
          name=""
          id=""
          cols="30"
          rows="30"
          placeholder="Enter details"
        ></textarea>
        <button onClick={() => convertToFormat()}>Convert</button>
      </div>

      {/* Right section of the screen (output) */}
      <div className="convert-output">
        <textarea
          name=""
          id=""
          cols="30"
          rows="30"
          value={textOutput}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Convert;
