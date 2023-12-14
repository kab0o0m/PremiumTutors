import { useState } from "react";
import "./Convert.css";

const Convert = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState(null);
  const [textFormat, setTextFormat] = useState(null);
  const [address, setAddress] = useState(null);

  const getFullAddress = async (postalCode) => {
    try {
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postalCode}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
          const address = data.results[0].ADDRESS;
          console.log(address);
          return address;
        } else {
          return "Address not found";
        }
      } else {
        console.error("Error fetching address:", response.statusText);
        return "Error fetching address";
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Error fetching address";
    }
  };

  // Convert to Json format first
  const convertToFormat = async () => {
    try {
      // Split lines when there is a new line
      const lines = textInput.split("\n");
      // Initiate client info object
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

      // Wait for the address to be fetched before proceeding
      const address = await getFullAddress(location);
      console.log(address);

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
      const typeOfTutor = clientInfo["Category of Tutor (For Academic)"];
      const fees = "$40 - $50/hour Graduate/Full-time Tutors";
      const commission = `First ${parseInt(frequency[0]) * 2} lessons`;
      const remarks = clientInfo["Remarks"];

      const interested_applicants =
        "Interested applicants, please apply via https://forms.gle/KhPULcKSQGrNrPWo6 or message @PHTapplications";

      const application_form =
        "Application Form for Registered Tutors: https://forms.gle/VCuCj7Pkdm7kMRX49";

      setTextOutput(
        `${level_subject + " @ " + location}\n\n${"Details of assignment"}\n${
          "Location: " + address
        }\n${"Duration: " + duration}\n${"Timing: " + timing}\n\n${
          "Fees: " + fees
        }\n\n${"Commission: " + commission}\n\n${
          "Remarks: " + remarks
        }\n\n${interested_applicants}\n\n${application_form}`
      );
    } catch (error) {
      console.error("Error converting to format:", error);
    }
  };

  return (
    <div className="convert">
      {/* Left section of the screen (input) */}
      <div className="convert-form">
        <textarea
          onChange={(e) => setTextInput(e.target.value)}
          name=""
          id=""
          cols="50"
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
          cols="50"
          rows="30"
          value={textOutput}
          readOnly
        ></textarea>
      </div>
    </div>
  );
};

export default Convert;
