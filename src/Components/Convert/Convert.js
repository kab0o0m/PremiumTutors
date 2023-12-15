import { useState } from "react";
import "./Convert.css";
import { type } from "@testing-library/user-event/dist/type";

const Convert = () => {
  const [textInput, setTextInput] = useState("");
  const [textOutput, setTextOutput] = useState(null);
  const [textFormat, setTextFormat] = useState(null);
  const [formData, setFormData] = useState({
    client_name: "",
    contact: "",
    postal: "",
    level: "",
    subject: "",
    frequency: "",
    timings: "",
    tutor1: false,
    tutor2: false,
    tutor3: false,
    remarks: "",
  });

  const fees = {
    "pre school": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 1": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 2": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
      moe: "$50 - $65",
    },
    "primary 3": {
      ptt: "$25 - $30",
      ftt: "$35 - $45",
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
    "junior college": {
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
    university: {
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

  const codeGeneration = (clientName, clientLevel) => {
    const first_letter = "C";
    let second_third_letter = clientLevel
      .replace(/\bPre School\b/i, "PS")
      .replace(/\bPrimary\b/i, "P")
      .replace(/\bSecondary\b/i, "S")
      .replace(/\bJunior College\b/i, "JC")
      .replace(/\bTertiary\b/i, "TE")
      .replace(/\bUniversity\b/i, "UN")
      .replace(/\bIGCSE\b/i, "IG")
      .replace(/\bIB Diploma\b/i, "IB")
      .replace(/\blangauges\b/i, "LA")
      .replace(/\s+/g, "");
    const extractFirstTwoLetters = (name) => {
      // Remove common prefixes from the name
      const cleanedName = name.replace(/^(Mr|Ms|Mrs|Dr|Doc|Mdm|Md)\.?\s+/i, "");

      // Extract the first two letters of the remaining name

      return cleanedName.slice(0, 2).toUpperCase();
    };

    const fourth_fifth_letter = extractFirstTwoLetters(clientName);

    return first_letter + second_third_letter + fourth_fifth_letter;
  };

  const interested_applicants =
    "Interested applicants, please apply via https://forms.gle/KhPULcKSQGrNrPWo6 or message @PHTapplications";

  const application_form =
    "Application Form for Registered Tutors: https://forms.gle/VCuCj7Pkdm7kMRX49";

  const sampleText = ` 
  1. Client Name: Ms Nana  
  2. Client Contact No.: 92983609
  3. Postal Code: 760453
  4. Level (Drop down): Primary 5
  5. Subject (Drop down): Maths, Science
  6. Same tutor/Separate tutor (for multiple subjects): Same tutor 
  7. Frequency: 1 / week
  8. Duration: 2 hours
  9. Timings: Wednesday 2pm onwards
  10. Category of Tutor (For Academic): FTT
  11. Rates (For Academic & Music): -
  12. Remarks: Tutor to be patient.`;

  // Get Full address from Onemap API
  const getFullAddress = async (postal) => {
    try {
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        if (data && data.results && data.results.length > 0) {
          const result = data.results[0];
          return {
            address: result.ADDRESS,
            latitude: result.LATITUDE,
            longitude: result.LONGITUDE,
          };
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
  const getNearbyMRTStations = async (latitude, longitude) => {
    const radius = 2000; // 1 km radius
    // Singapore's bounding box coordinates
    const singaporeBounds = {
      minLat: 1.130475,
      maxLat: 1.450475,
      minLon: 103.600006,
      maxLon: 104.100006,
    };

    // Check if the coordinates are within Singapore
    if (
      latitude < singaporeBounds.minLat ||
      latitude > singaporeBounds.maxLat ||
      longitude < singaporeBounds.minLon ||
      longitude > singaporeBounds.maxLon
    ) {
      return "Location is not within Singapore";
    }

    const query = `
        [out:json];
        (
            node["railway"="station"](around:${radius},${latitude},${longitude});
        );
        out;`;
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(overpassUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.elements; // Returns an array of MRT stations
    } catch (error) {
      console.error("Error fetching MRT stations:", error);
      return [];
    }
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
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
      console.log(clientInfo);
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
      const fullAddress = await getFullAddress(location);

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

      setTextOutput(
        `${level_subject + " @ " + location}\n\n${"Details of assignment"}\n${
          "Location: " + fullAddress
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

  //Updates form data as user updates it
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    const clientName =
      formData["client_name"].charAt(0).toUpperCase() +
      formData["client_name"].slice(1);
    const clientContact = formData["contact"];
    const clientPostal = formData["postal"];
    const clientAddress = await getFullAddress(clientPostal);
    console.log(clientAddress.latitude);
    const nearbyStations = await getNearbyMRTStations(
      clientAddress.latitude,
      clientAddress.longitude
    );
    console.log("Nearby Stations:", nearbyStations);

    const findNearestStation = (stations, latitude, longitude) => {
      if (stations.length === 0) {
        return "No nearby MRT station found";
      }

      const filterMRTStations = (stations) => {
        return stations.filter((station) => {
          // Check if the station's wikipedia tag contains 'MRT' and does not contain 'LRT'
          if (station.tags && station.tags.wikipedia) {
            // Further check if the wikipedia tag contains 'MRT' and does not contain 'LRT'
            return station.tags.wikipedia.includes("MRT");
          }
        });
      };
      stations = filterMRTStations(stations);

      let nearestStation = stations[0];
      let minDistance = getDistance(
        latitude,
        longitude,
        nearestStation.lat,
        nearestStation.lon
      );

      stations.forEach((station) => {
        const distance = getDistance(
          latitude,
          longitude,
          station.lat,
          station.lon
        );
        if (distance < minDistance) {
          minDistance = distance;
          nearestStation = station;
        }
      });

      return nearestStation.tags.name;
    };

    const nearestStationName = findNearestStation(
      nearbyStations,
      clientAddress.latitude,
      clientAddress.longitude
    );
    const level = formData["level"].toLowerCase();

    let clientLevel = level
      .replace(/\bpre\b/i, "Pre school")
      .replace(/\bpreschool\b/i, "Pre school")
      .replace(/(pri|primary|p)(\d+)/i, "Primary $2")
      .replace(/\bprimary\b/i, "Primary")
      .replace(/\bpri\b/i, "Primary")
      .replace(/\bp\b/i, "Primary")
      .replace(/(sec|secondary)(\d+)/i, "Secondary $2")
      .replace(/\bsecondary\b/i, "Secondary")
      .replace(/\bsec\b/i, "Secondary")
      .replace(/\bjunior college\b/i, "Junior College")
      .replace(/\bjunior\b/i, "Junior College")
      .replace(/\bjc\b/i, "Junior College")
      .replace(/\bis\b/i, "IGCSE")
      .replace(/\bigcse\b/i, "IGCSE")
      .replace(/\bib/i, "IB Diploma")
      .replace(/\bpoly\b/i, "Tertiary")
      .replace(/\bpolytechnic\b/i, "Tertiary")
      .replace(/\bu\b/i, "University")
      .replace(/\buni\b/i, "University")
      .replace(/\buniversity\b/i, "University")
      .replace(/\bal\b/i, "Adult Learner")
      .replace(/\badult\b/i, "Adult Learner")
      .replace(/\badult learner\b/i, "Adult Learner");
    console.log("clientLevel: " + clientLevel);
    const subjects = formData["subject"].split(/[\s,]+/).filter(Boolean);
    const clientSubject = subjects
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(", ");
    const clientFrequency = formData["frequency"];
    const clientTimings = formData["timings"];
    let clientFees = "";
    try {
      const rate = fees[clientLevel.toLowerCase()];
      if (formData["tutor1"]) {
        clientFees =
          clientFees +
          rate["ptt"] +
          "/hour" +
          " Part Time/Undergrad Tutor" +
          "\n";
      }
      if (formData["tutor2"]) {
        clientFees =
          clientFees +
          rate["ftt"] +
          "/hour" +
          " Full Time/Graduate Tutor" +
          "\n";
      }
      if (formData["tutor3"]) {
        clientFees =
          clientFees +
          rate["moe"] +
          "/hour" +
          " Ex/Current School Teachers" +
          "\n";
      }

      const commission = `First ${parseInt(clientFrequency[0]) * 2} lessons`;

      const clientRemarks = formData["remarks"];
      setTextOutput(
        `${
          clientLevel + " " + clientSubject + " @ " + nearestStationName
        }\n\n${"Details of assignment"}\n${
          "Location: " + clientAddress.address
        }\n${"Duration: " + clientFrequency}\n${
          "Timing: " + clientTimings
        }\n\n${"Fees: " + clientFees}\n${"Commission: " + commission}\n\n${
          "Remarks: " + clientRemarks
        }\n\n${interested_applicants}\n\n${application_form}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="convert">
      {/* Left Side of the screen (form) */}
      <div className="convert-form">
        <div className="form-title">Client Form</div>
        <form action="" onSubmit={handleSubmit}>
          <div className="name">
            <label htmlFor="client_name">Client Name</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
            />
          </div>
          <div className="contact">
            <label htmlFor="contact">Client Contact no.</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
            />
          </div>

          <label htmlFor="postal">Postal Code</label>
          <input
            type="text"
            id="postal"
            name="postal"
            value={formData.postal}
            onChange={handleInputChange}
          />
          <label htmlFor="level">Level</label>
          <input
            type="text"
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
          />
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
          />
          <label htmlFor="frequency">Duration</label>
          <input
            type="text"
            id="frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleInputChange}
          />

          <label htmlFor="timings">Timings</label>
          <input
            type="text"
            id="timings"
            name="timings"
            value={formData.timings}
            onChange={handleInputChange}
          />
          <label htmlFor="tutor">Category of Tutor</label>
          <div id="tutor1">
            <input
              type="checkbox"
              id="tutor1"
              name="tutor1"
              value="ftt"
              checked={formData.tutor1}
              onChange={handleInputChange}
            />
            <label htmlFor="tutor1">Part Time/Undergrad Tutor</label>
          </div>
          <br />
          <div id="tutor2">
            <input
              type="checkbox"
              id="tutor2"
              name="tutor2"
              value="ftt"
              checked={formData.tutor2}
              onChange={handleInputChange}
            />
            <label htmlFor="tutor2">Full Time/Graduate Tutor</label>
          </div>
          <br />
          <div id="tutor3">
            <input
              type="checkbox"
              id="tutor3"
              name="tutor3"
              value="ftt"
              checked={formData.tutor3}
              onChange={handleInputChange}
            />
            <label htmlFor="tutor3">Ex /Current School Teachers</label>
          </div>

          <br />
          <label htmlFor="timings">Remarks</label>
          <input
            type="text"
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
          />
          <input type="submit" id="submit" value="Submit" />
        </form>
      </div>
      {/* Middle section of the screen (input) */}
      <div className="convert-input">
        <div className="convert-input-title">Copy paste </div>
        <textarea
          onChange={(e) => setTextInput(e.target.value)}
          name=""
          id=""
          cols="50"
          rows="30"
          placeholder={sampleText}
        ></textarea>
        <button onClick={() => convertToFormat()}>Convert</button>
      </div>

      {/* Right section of the screen (output) */}
      <div className="convert-output">
        <div className="convert-output-title">Output</div>
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
