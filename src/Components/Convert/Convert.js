import { useState } from "react";
import "./Convert.css";
import getNearestMrt from "nearest-mrt";
import fees from "../../Fees";

const Convert = () => {
  const [textInput, setTextInput] = useState(" ");
  const [textOutput1, setTextOutput1] = useState(" ");
  const [textOutput2, setTextOutput2] = useState(" ");

  //const [textFormat, setTextFormat] = useState(null);
  const initialFormData = {
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
    music: false,
    remarks: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleReset = () => {
    setFormData(initialFormData);
    setTextOutput1("");
    setTextOutput2("");
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
    second_third_letter = (
      second_third_letter[0] + second_third_letter[1]
    ).toUpperCase();

    const extractFirstTwoLetters = (name) => {
      // Remove common prefixes from the name
      const cleanedName = name.replace(/^(Mr|Ms|Mrs|Dr|Doc|Mdm|Md)\.?\s+/i, "");

      // Extract the first two letters of the remaining name

      return cleanedName.slice(0, 2).toUpperCase();
    };

    const fourth_fifth_letter = extractFirstTwoLetters(clientName);

    return first_letter + second_third_letter + fourth_fifth_letter;
  };

  let interested_applicants =
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

  // Second row converting (Used for converting format to format)
  /*const convertToFormat = async () => {
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

      let level = clientInfo["Level (Drop down)"].toLowerCase();

      const levelFees = fees[level];
      console.log(levelFees);
      const typeOfTutor =
        clientInfo["Category of Tutor (For Academic)"].toLowerCase();
      console.log(clientInfo);
      let fullTypeOfTutor = "";

      if (typeOfTutor.toLowerCase().includes("ptt")) {
        fullTypeOfTutor +=
          levelFees["ptt"] + "/hour " + "Part Time/Undergrad Tutor\n";
      }
      if (typeOfTutor.toLowerCase().includes("ftt")) {
        fullTypeOfTutor +=
          levelFees["ftt"] + "/hour " + "Full Time/Graduate Tutor\n";
      }
      if (typeOfTutor.toLowerCase().includes("moe")) {
        fullTypeOfTutor +=
          levelFees["moe"] + "/hour " + "Ex /Current School Teachers\n";
      }

      const subject = clientInfo["Subject (Drop down)"];
      level = level
        .replace(/\s/g, "")
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
      const level_subject =
        level.charAt(0).toUpperCase() + level.slice(1) + " " + subject;
      const location = clientInfo["Postal Code"];

      // Wait for the address to be fetched before proceeding
      const fullAddress = await getFullAddress(location);
      console.log(fullAddress);
      const fullAddressLatLong = [
        parseFloat(fullAddress.longitude),
        parseFloat(fullAddress.latitude),
      ];
      const nearestMRT = getNearestMrt(fullAddressLatLong, false, 2000);

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

      let commission = `First ${parseInt(frequency[0]) * 2} lessons`;
      if (duration.includes("per subject")) {
        commission += " per subject";
      }

      const remarks = clientInfo["Remarks"];

      setTextOutput2(
        `${
          level_subject + " @ " + nearestMRT.result[0].station.name
        }\n\n${"Details of assignment"}\n${
          "Location: " + fullAddress.address
        }\n${"Duration: " + duration}\n${"Timing: " + timing}\n\n${
          "Fees: " + fullTypeOfTutor
        }\n\n${"Commission: " + commission}\n\n${
          "Remarks: " + remarks
        }\n\n${interested_applicants}\n\n${application_form}`
      );
    } catch (error) {
      console.error("Error converting to format:", error);
    }
  };*/

  //Updates form data as user updates it
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //Submit form (First Row)
  const handleSubmit = async (e) => {
    //Stops page from refreshing
    e.preventDefault();

    //Saves form data
    console.log("Form data submitted:", formData);

    //Extract Client Name
    const clientName =
      formData["client_name"].charAt(0).toUpperCase() +
      formData["client_name"].slice(1);
    const clientContact = formData["contact"];

    // Handle get address
    // Extract postal code from the form
    let clientPostal = "";

    if (formData["postal"].length === 6) {
      clientPostal = formData["postal"];
    }

    //Fetch full address using the getFullAddress(postal) function
    const clientAddress = await getFullAddress(clientPostal);
    let clientLatLong = "";
    let nearestMRT = "";
    let nameOfNearestMrt = "Not Found";

    //Extract lat and long to calculate nearest mrt if clientAddress returns

    // Ensure clientAddress is valid and not "Address not found"
    if (clientAddress && clientAddress !== "Address not found") {
      clientLatLong = [
        parseFloat(clientAddress.longitude),
        parseFloat(clientAddress.latitude),
      ];
      console.log("Client Latitude and Longitude:", clientLatLong);

      try {
        // Assuming getNearestMrt returns an array, even if it's empty
        nearestMRT = getNearestMrt(clientLatLong, false, 2000);
        nameOfNearestMrt = nearestMRT.result[0].station.name;
        console.log("Nearest MRT:", nearestMRT);

        // Check if nearestMRT is defined and has at least one element
        if (nearestMRT.result <= 0) {
          alert("No MRT station found within the specified radius.");
        }
      } catch (error) {
        console.error("Error in finding nearest MRT:", error);
        alert("Error in finding nearest MRT");
      }
    } else {
      alert("Cannot find nearest MRT due to invalid address.");
    }

    //Extract Study Level
    const level = formData["level"].toLowerCase();

    let clientLevel = level
      .replace(/\bnursery\b/i, "Nursery")
      .replace(/\bn\b/i, "Nursery")
      .replace(/\bk\b/i, "Kindergarten")
      .replace(/\bkindergarten\b/i, "Kindergarten")
      .replace(/(k|kindergarten)(\d+)/i, "Kindergarten $2")
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
      .replace(/\bpoly\b/i, "Polytechnic")
      .replace(/\bpolytechnic\b/i, "Polytechnic")
      .replace(/\bu\b/i, "University")
      .replace(/\buni\b/i, "University")
      .replace(/\buniversity\b/i, "University")
      .replace(/\bal\b/i, "Adult Learner")
      .replace(/\badult\b/i, "Adult Learner")
      .replace(/\badult learner\b/i, "Adult Learner")
      .replace(/\bbeginnner\b/i, "Beginner")
      .replace(/\bb\b/i, "Beginner")
      .replace(/\bgrade\b/i, "Grade")
      .replace(/\bg\b/i, "Grade")
      .replace(/(g|grade)(\d+)/i, "Grade $2")
      .replace(/\bleisure\b/i, "Leisure")
      .replace(/\btennis\b/i, "Tennis")
      .replace(/\bbadminton\b/i, "Badminton")
      .replace(/\bdiploma\b/i, "Diploma");
    console.log(clientLevel);
    //Extract Subjects
    const subjects = formData["subject"].split(/[\s,]+/).filter(Boolean);

    //Handle multiple subjects
    const clientSubject = subjects
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join(", ");

    const musicSubject = formData["subject"].toLowerCase();
    console.log(musicSubject);

    //Gets frequency
    const clientFrequency = formData["frequency"];

    //Gets timings
    const clientTimings = formData["timings"];
    //Calculate commission for the company
    let commission = `First ${parseInt(clientFrequency[0]) * 2} lessons`;

    if (clientFrequency.includes("per subject")) {
      commission = commission + " per subject";
    }

    //Gets Remarks
    const clientRemarks = formData["remarks"];
    //Calculate Fees
    let clientFees = "";

    try {
      if (clientLevel.toLowerCase() in fees) {
        const rate = fees[clientLevel.toLowerCase()];
        console.log(rate);
        console.log(rate[musicSubject]);
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
        if (formData["music"]) {
          clientFees = clientFees + rate[musicSubject] + "/lesson";
          interested_applicants =
            "Interested applicants, please apply via https://forms.gle/G38YJgFVxLwTpvSr7 or message @PHTapplications";
        }
      } else {
        clientFees = "";
        clientLevel =
          clientLevel.charAt(0).toUpperCase() + clientLevel.slice(1);
      }
      //Set output
      setTextOutput1(
        `${
          clientLevel + " " + clientSubject + " @ " + nameOfNearestMrt
        }\n\n${"Details of assignment"}\n${
          "Location: " + clientAddress.address
        }\n${"Duration: " + clientFrequency}\n${
          "Timing: " + clientTimings
        }\n\n${"Fees: " + clientFees}\n${"Commission: " + commission}\n\n${
          "Remarks: " + clientRemarks
        }\n\n${interested_applicants}\n\n${application_form}\n\n${
          "Code: " + codeGeneration(clientName, clientLevel)
        }`
      );
      interested_applicants =
        "Interested applicants, please email your profile to contact@premiumtutors.sg with the following details:";

      setTextOutput2(
        `${
          clientLevel + " " + clientSubject + " @ " + nameOfNearestMrt
        }\n\n${"Details of assignment"}\n${
          "Location: " + clientAddress.address
        }\n${"Duration: " + clientFrequency}\n${
          "Timing: " + clientTimings
        }\n\n${"Fees: " + clientFees}\n${"Commission: " + commission}\n\n${
          "Remarks: " + clientRemarks
        }\n\n${interested_applicants}\n\n${application_form}\n\n${
          "Code: " + codeGeneration(clientName, clientLevel)
        }\n\n${"Full name:"}\n${"Age, Gender:"}\n${"Address:"}\n${"Contact Number:"}\n${"Qualifications:"}\n${"Current Occupation:"}\n${"Tuition Experience (in years):"}\n${"Brief description of experience in relevant subject(s):"}\n${"Preferred timings:"}\n${"Expected hourly rate:"}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="convert">
      <div className="convert-row-1">
        {/* First Row */}
        {/* First row left section (form)*/}
        <div className="convert-form">
          <div className="form-title">Client Form</div>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="client_name">Client Name</label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleInputChange}
              placeholder="Eg. Ms Nana"
            />
            <label htmlFor="contact">Client Contact no.</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Eg. 91234567"
            />

            <label htmlFor="postal">Postal Code</label>
            <input
              type="text"
              id="postal"
              name="postal"
              value={formData.postal}
              onChange={handleInputChange}
              placeholder="Eg. 051531"
            />
            <label htmlFor="level">Level</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              placeholder="Eg. p5"
            />
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              placeholder="Eg. math, science, english"
            />
            <label htmlFor="frequency">Duration</label>
            <input
              type="text"
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              placeholder="Eg. 1 x 2 hrs/ week"
            />

            <label htmlFor="timings">Timings</label>
            <input
              type="text"
              id="timings"
              name="timings"
              value={formData.timings}
              onChange={handleInputChange}
              placeholder="Eg. Wednesday 7pm-8pm"
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
            <div id="music">
              <input
                type="checkbox"
                id="music"
                name="music"
                value="music"
                checked={formData.music}
                onChange={handleInputChange}
              />
              <label htmlFor="tutor3">Music / Sports</label>
            </div>

            <br />
            <label htmlFor="timings">Remarks</label>
            <input
              type="text"
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              placeholder="Tutor to be patient"
            />
            <div className="button">
              <button className="submit-form">
                <input type="submit" id="submit" value="Submit" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="clear-form"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
        {/* First row middle section (Guide) */}
        <div className="guide">
          <div className="guide-title">Guide (Shortcuts)</div>
          <div className="guide-description">
            <div className="academic">
              <p>Pre School</p>
              <p>"pre", "preschool", "Pre school"</p>
              <p>Nursery</p>
              <p>"n", "nursery"</p>
              <p>Kindergarten 1-2</p>
              <p>"k1", "kindergarten 2"</p>
              <p>Primary 1-6</p>
              <p>"p1", "Pri 5", "primary2"</p>
              <p>Secondary 1-5</p>
              <p>"sec1", "Sec 3", "Secondary4"</p>
              <p>Junior College (JC)</p>
              <p>"jc", "junior", "junior college"</p>
              <p>IGCSE</p>
              <p>"is", "igcse"</p>
              <p>IB Diploma</p>
              <p>"ib"</p>
              <p>Tertiary</p>
              <p>"poly", "polytechnic"</p>
              <p>University</p>
              <p>"u","uni", "university"</p>
              <p>Adult Learner</p>
              <p>"adult", "adult learner"</p>
            </div>
            <div className="music">
              <p>Beginner (Music)</p>
              <p>"b", "beginner"</p>
              <p>Grade 1-8 (Music)</p>
              <p>"grade1", "g2", "g 5"</p>
              <p>Diploma (Music)</p>
              <p>"diploma"</p>
              <p>Leisure (Music)</p>
              <p>"leisure"</p>
              <p>Badminton (Sports)</p>
              <p>"badminton</p>
              <p>Tennis (Sports)</p>
              <p>"tennis"</p>
              <br />
              <br />
              <p>Subjects available</p>
              <p>Music: Piano, Guitar, Violin, Drums, Ukulele</p>
              <br />
              <p>Sports: private, pair, group</p>
            </div>
          </div>
        </div>
        {/* First row Right section (form-output) */}
      </div>

      {/* Second row Right section (form-output) */}
      <div className="convert-row-2">
        <div className="convert-output">
          <div className="convert-output-title">Telegram Template</div>
          <textarea
            name=""
            id=""
            cols="50"
            rows="30"
            value={textOutput1}
          ></textarea>
        </div>
        <div className="convert-output-2">
          <div className="convert-output-title-2">Many Tutors Template</div>
          <textarea
            name=""
            id=""
            cols="50"
            rows="30"
            value={textOutput2}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Convert;
