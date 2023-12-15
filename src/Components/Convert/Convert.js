import { useState } from "react";
import "./Convert.css";
import { type } from "@testing-library/user-event/dist/type";

const Convert = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState(null);
  const [textFormat, setTextFormat] = useState(null);
  const [clientName, setClientName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [clientLevel, setClientLevel] = useState("");
  const [clientSubject, setClientSubject] = useState("");
  const [clientFrequency, setClientFrequency] = useState("");
  const [clientDuration, setClientDuration] = useState("");
  const [clientTiming, setClientTiming] = useState("");
  const [clientCategory, setClientCategory] = useState("");

  const fees = {
    "pre school": {
      ptt: "$25 - $30",
      FTT: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 1": {
      ptt: "$25 - $30",
      FTT: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 2": {
      ptt: "$25 - $30",
      FTT: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 3": {
      ptt: "$25 - $30",
      FTT: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 4": {
      ptt: "$30 - $35",
      ftt: "$40 - $50",
      moe: "$60 - $75",
    },
    "primary 5": {
      ptt: "$30 - $35",
      ftt: "$40 - $50",
      moe: "$60 - $75",
    },
    "primary 6": {
      ptt: "$30 - $35",
      ftt: "$40 - $50",
      moe: "$60 - $75",
    },
    "secondary 1": {
      ptt: "$35 - $40",
      ftt: "$45 - $55",
      moe: "$60 - $80",
    },
    "secondary 2": {
      ptt: "$35 - $40",
      ftt: "$45 - $55",
      moe: "$60 - $80",
    },
    "secondary 3": {
      ptt: "$35 - $45",
      ftt: "$45 - $60",
      moe: "$65 - $90",
    },
    "secondary 4": {
      ptt: "$35 - $45",
      ftt: "$45 - $60",
      moe: "$65 - $90",
    },
    "secondary 5": {
      ptt: "$35 - $45",
      ftt: "$45 - $60",
      moe: "$65 - $90",
    },
    jc: {
      ptt: "$40 - $55",
      ftt: "$65 - $80",
      moe: "$90- $120",
    },
    igcse: {
      ptt: "$35 - $50",
      ftt: "$45 - $75",
      moe: "$60 - $110",
    },
    "ib diploma": {
      ptt: "$40 - $55",
      ftt: "$65 - $85",
      moe: "$90 - $120",
    },
    tertiary: {
      ptt: "$40 - $60",
      ftt: "$60 - $90",
      moe: "$100 - $120",
    },
    languages: {
      ptt: "$35 - $45",
      ftt: "$50 - $70",
      moe: "$70 - $100",
    },
  };

  // Get Full address from Onemap API
  const getFullAddress = async (postal) => {
    try {
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
          const address = data.results[0].ADDRESS;

          console.log("Address:", address);

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

      const level = clientInfo["Level (Drop down)"].toLowerCase();
      const levelFees = fees[level];
      console.log(levelFees);
      const typeOfTutor =
        clientInfo["Category of Tutor (For Academic)"].toLowerCase();
      const rates = levelFees[typeOfTutor];
      let fullTypeOfTutor;
      if (typeOfTutor === "ptt") {
        fullTypeOfTutor = "Part Time/Undergrad Tutor";
      } else if (typeOfTutor === "ftt") {
        fullTypeOfTutor = "Full Time/Graduate Tutor";
      } else if (typeOfTutor === "moe") {
        fullTypeOfTutor = "Ex /Current School Teachers";
      }

      const subject = clientInfo["Subject (Drop down)"];
      const level_subject =
        level.charAt(0).toUpperCase() + level.slice(1) + " " + subject;
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
          "Fees: " + rates + "/hour " + fullTypeOfTutor
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
      {/* Left Side of the screen (form) */}
      <div className="convert-form">
        <form action="">
          <label htmlFor="client_name">Client Name</label>
          <input type="text" id="client_name" name="client_name" />
          <label htmlFor="contact">Client Contact no.</label>
          <input type="text" id="contact" name="contact" />
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" name="postal" />
          <label htmlFor="level">Level</label>
          <input type="text" id="level" name="level" />
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" name="subject" />
          <label htmlFor="frequency">Frequency</label>
          <input type="text" id="frequency" name="frequency" />
          <label htmlFor="duration">Duration</label>
          <input type="text" id="duration" name="duration" />
          <label htmlFor="timings">Timings</label>
          <input type="text" id="timings" name="timings" />
          <label htmlFor="tutor">Category of Tutor</label>
          <input type="checkbox" id="tutor1" name="tutor1" value="ftt" />
          <label htmlFor="tutor1">Part Time/Undergrad Tutor</label>
          <br />
          <input type="checkbox" id="tutor2" name="tutor2" value="ftt" />
          <label htmlFor="tutor2">Full Time/Graduate Tutor</label>
          <br />
          <input type="checkbox" id="tutor3" name="tutor3" value="ftt" />
          <label htmlFor="tutor3">Ex /Current School Teachers</label>
          <br />
          <input type="submit" id="submit" value="Submit" />
        </form>
      </div>
      {/* Middle section of the screen (input) */}
      <div className="convert-input">
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
