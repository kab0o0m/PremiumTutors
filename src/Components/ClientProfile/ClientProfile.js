import { useState } from "react";
import "./ClientProfile.css";
import getNearestMrt from "nearest-mrt";
import fees from "../../Fees";
import axios from "axios";

const Convert = () => {
  //Text output1 and output2 is used to generate formatted data
  const [textOutput1, setTextOutput1] = useState(" ");
  const [textOutput2, setTextOutput2] = useState(" ");
  const [copy, setCopy] = useState("");
  const [copy2, setCopy2] = useState("");

  //Empty form
  const initialFormData = {
    client_name: "",
    contact: "",
    postal: "",
    online: false,
    level: "",
    subject: "",
    separateTutor: false,
    sameTutor: false,
    frequency: "",
    timings: "",
    tutor1: false,
    tutor2: false,
    tutor3: false,
    music: false,
    remarks: "",
  };

  //Initialise form to be empty
  const [formData, setFormData] = useState(initialFormData);

  //Reset all to empty
  const handleReset = () => {
    setFormData(initialFormData);
    setTextOutput1("");
    setTextOutput2("");
    setCopy("");
    setCopy2("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to copy text to clipboard
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text successfully copied to clipboard");
    } catch (err) {
      console.error("Unable to copy text to clipboard", err);
    }
  };

  /*Code generation:
    First letter is "C"
    Second and third letter is obtained from client level
    Fourth and Fifth letter is obtained from client name
  */
  const codeGeneration = (clientName, clientLevel, clientSubject) => {
    //First letter
    const first_letter = "C";
    let second_third_letter = "";

    //If client subject is music
    if (formData["music"]) {
      let second_letter = clientLevel
        .replace(/\bBeginner\b/i, "B")
        .replace(/\bGrade\b/i, "G")
        .replace(/\bDiploma\b/i, "D")
        .replace(/\bLeisure\b/i, "L")
        .replace(/\bBadminton\b/i, "B")
        .replace(/\bTennis\b/i, "B")
        .replace(/\d+/g, "")
        .replace(/\s+/g, "");

      let third_letter = clientSubject
        .replace(/\bPiano\b/i, "P")
        .replace(/\bGuitar\b/i, "G")
        .replace(/\bViolin\b/i, "V")
        .replace(/\bDrums\b/i, "D")
        .replace(/\bUkulele\b/i, "U")
        .replace(/\bPrivate\b/i, "P")
        .replace(/\bPair\b/i, "P")
        .replace(/\bGroup\b/i, "G")
        .replace(/\d+/g, "")
        .replace(/\s+/g, "");

      second_third_letter = (second_letter + third_letter).toUpperCase();
    } else {
      //Second and third letter
      second_third_letter = clientLevel
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
    }

    //Extracts first two letters of any string for fourth and fifth letter of the code generator
    const extractFirstTwoLetters = (name) => {
      // Remove common prefixes from the name
      const cleanedName = name.replace(/^(Mr|Ms|Mrs|Dr|Doc|Mdm|Md)\.?\s+/i, "");

      // Extract the first two letters of the remaining name
      return cleanedName.slice(0, 2).toUpperCase();
    };

    //Fourth and fifth letter
    const fourth_fifth_letter = extractFirstTwoLetters(clientName);

    return first_letter + second_third_letter + fourth_fifth_letter;
  };

  //For academic template
  let interested_applicants =
    "Interested applicants, please apply via https://forms.gle/KhPULcKSQGrNrPWo6 or message @PHTapplications";

  //For many tutors template
  const application_form =
    "Application Form for Registered Tutors: https://forms.gle/VCuCj7Pkdm7kMRX49";

  // Get Full address from Onemap API, postal code is obtained from form
  const getFullAddress = async (postal) => {
    try {
      const url = `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${postal}&returnGeom=Y&getAddrDetails=Y&pageNum=1`;

      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data;

        if (data && data.results && data.results.length > 0) {
          const result = data.results[0];
          return {
            address: result.ADDRESS.toLowerCase()
              .split(" ")
              .map(
                (address) => address.charAt(0).toUpperCase() + address.slice(1)
              )
              .join(" "),
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

    //Extract Client Name
    const clientName =
      formData["client_name"].charAt(0).toUpperCase() +
      formData["client_name"].slice(1);
    const clientContact = formData["contact"];

    // Handle get address
    // If online checkbox is clicked
    // Set Nearest mrt and client Address as "Online"
    // Else check whether postal code length is === 6
    let clientAddress = "";
    let nameOfNearestMrt = "Not Found";
    if (formData["online"]) {
      nameOfNearestMrt = "Online";
      clientAddress = {
        address: "Online",
      };
    } else {
      // Extract postal code from the form
      if (formData["postal"].length === 6) {
        let clientPostal = "";
        clientPostal = formData["postal"];
        clientAddress = await getFullAddress(clientPostal);

        //Fetch full address using the getFullAddress(postal) function
        let clientLatLong = "";
        let nearestMRT = "";

        //Extract lat and long to calculate nearest mrt if clientAddress returns
        // Ensure clientAddress is valid and not "Address not found"
        if (clientAddress && clientAddress !== "Address not found") {
          clientLatLong = [
            parseFloat(clientAddress.longitude),
            parseFloat(clientAddress.latitude),
          ];

          try {
            // Assuming getNearestMrt returns an array, even if it's empty
            nearestMRT = getNearestMrt(clientLatLong, false, 3000);
            nameOfNearestMrt = nearestMRT.result[0].station.name.toLowerCase();
            nameOfNearestMrt = nameOfNearestMrt
              .toLowerCase()
              .split(" ")
              .map(
                (address) => address.charAt(0).toUpperCase() + address.slice(1)
              )
              .join(" ");

            // Check if nearestMRT is defined and has at least one element
            if (!formData["online"] && nearestMRT.result <= 0) {
              alert("No MRT station found within the specified radius.");
            }
          } catch (error) {
            console.error("Error in finding nearest MRT:", error);
            if (!formData["online"]) {
              alert("Error in finding nearest MRT");
            }
          }
        } else {
          alert("Cannot find nearest MRT due to invalid address.");
        }
      } else {
        alert("Postal code must be 6 digits!");
      }
    }

    //Replace all short forms
    const shortForm = () => {
      //Extract Study Level
      const level = formData["level"].toLowerCase().trim();
      return level
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
        .replace(/(jc|junior|junior college)(\d+)/i, "Junior College $2")
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
        .replace(/\bbeginner\b/i, "Beginner")
        .replace(/\bb\b/i, "Beginner")
        .replace(/\bgrade\b/i, "Grade")
        .replace(/\bg\b/i, "Grade")
        .replace(/(g|grade)(\d+)/i, "Grade $2")
        .replace(/\bleisure\b/i, "Leisure")
        .replace(/\btennis\b/i, "Tennis")
        .replace(/\bbadminton\b/i, "Badminton")
        .replace(/\bdiploma\b/i, "Diploma");
    };

    let clientLevel = shortForm();

    //Extract Subjects
    //Gets Remarks
    let clientRemarks = formData["remarks"];
    const clientSubject = formData["subject"].trim();
    let tutorType = "";
    if (formData["separateTutor"]) {
      tutorType = " (Separate Tutors)";
      clientRemarks += "Tutor to state subject(s) they can teach.";
    } else if (formData["sameTutor"]) {
      tutorType = " (Same Tutor)";
      clientRemarks += "Same tutor needed for all subjects.";
    }

    //gets music subject
    const musicSubject = formData["subject"].toLowerCase();

    //Gets frequency
    const clientFrequency = formData["frequency"];

    //Gets timings
    const clientTimings = formData["timings"];

    //Calculate commission for the company
    const calculateCommission = () => {
      let calc = `First ${parseInt(clientFrequency[0]) * 2} lessons`;
      if (clientFrequency.includes("per subject")) {
        calc = calc + " per subject";
      }
      return calc;
    };

    const commission = calculateCommission();

    let clientFees = "";
    try {
      //Calculate Fees
      if (clientLevel.toLowerCase() in fees) {
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
      setCopy(" ");
      setCopy2(" ");
      //Set output for Telegram template
      setTextOutput1(
        `${
          clientLevel +
          " " +
          clientSubject +
          tutorType +
          " @ " +
          nameOfNearestMrt
        }\n\n${"Details of assignment"}\n${
          "Location: " + clientAddress.address
        }\n${"Duration: " + clientFrequency}\n${
          "Timing: " + clientTimings
        }\n\n${"Fees: " + clientFees}\n${"Commission: " + commission}\n\n${
          "Remarks: " + clientRemarks
        }\n\n${interested_applicants}\n\n${application_form}\n\n${
          "Code: " + codeGeneration(clientName, clientLevel, clientSubject)
        }`
      );

      setTextOutput2(
        `${
          clientLevel +
          " " +
          clientSubject +
          tutorType +
          " @ " +
          nameOfNearestMrt
        }\n\n${"Details of assignment"}\n${
          "Location: " + clientAddress.address
        }\n${"Duration: " + clientFrequency}\n${
          "Timing: " + clientTimings
        }\n\n${"Fees: " + clientFees}\n${"Commission: " + commission}\n\n${
          "Remarks: " + clientRemarks
        }\n\n${"Interested applicants, please email your profile to contact@premiumtutors.sg with the following details:"}\n\n${
          "Code: " + codeGeneration(clientName, clientLevel, clientSubject)
        }\n\n${"Full name:"}\n${"Age, Gender:"}\n${"Address:"}\n${"Contact Number:"}\n${"Qualifications:"}\n${"Current Occupation:"}\n${"Tuition Experience (in years):"}\n${"Brief description of experience in relevant subject(s):"}\n${"Preferred timings:"}\n${"Expected hourly rate:"}`
      );

      //Scroll to the Bottom of the page to see results
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const convertTeleToMany = () => {
    //Replace interested applicants and application form to just interested applicants
    let manyTutor = textOutput1
      .replace(
        /Interested applicants, please apply via https:\/\/forms.gle\/KhPULcKSQGrNrPWo6 or message @PHTapplications\n\nApplication Form for Registered Tutors: https:\/\/forms.gle\/VCuCj7Pkdm7kMRX49/,
        "Interested applicants, please email your profile to contact@premiumtutors.sg with the following details:"
      )
      .replace(
        /Interested applicants, please apply via https:\/\/forms.gle\/G38YJgFVxLwTpvSr7 or message @PHTapplications\n\nApplication Form for Registered Tutors: https:\/\/forms.gle\/VCuCj7Pkdm7kMRX49/,
        "Interested applicants, please email your profile to contact@premiumtutors.sg with the following details:"
      );

    manyTutor =
      manyTutor +
      `\n\n${"Full name:"}\n${"Age, Gender:"}\n${"Address:"}\n${"Contact Number:"}\n${"Qualifications:"}\n${"Current Occupation:"}\n${"Tuition Experience (in years):"}\n${"Brief description of experience in relevant subject(s):"}\n${"Preferred timings:"}\n${"Expected hourly rate:"}`;
    setTextOutput2(manyTutor);
  };

  const convertManyToTele = () => {
    let teleFormat = textOutput2.replace(
      /Interested applicants, please email your profile to contact@premiumtutors.sg with the following details:/,
      "Interested applicants, please apply via https://forms.gle/KhPULcKSQGrNrPWo6 or message @PHTapplications\n\nApplication Form for Registered Tutors: https://forms.gle/VCuCj7Pkdm7kMRX49"
    );

    teleFormat = teleFormat.replace(
      /Full name:[\s\S]*?Expected hourly rate:/,
      ""
    );

    setTextOutput1(teleFormat);
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
            <div className="postal-code">
              <label htmlFor="postal">Postal Code</label>
              <input
                type="text"
                id="postal"
                name="postal"
                value={formData.postal}
                onChange={handleInputChange}
                placeholder="Eg. 051531"
              />
              <div id="online">
                <input
                  type="checkbox"
                  id="online"
                  name="online"
                  value="online"
                  checked={formData.online}
                  onChange={handleInputChange}
                />
                <label htmlFor="online">Online Lessons</label>
              </div>
            </div>

            <label htmlFor="level">Level</label>
            <input
              type="text"
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              placeholder="Eg. p5"
            />
            <div className="subject">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Eg. math, science, english"
              />
              <div id="separateTutor">
                <input
                  type="checkbox"
                  id="separateTutor"
                  name="separateTutor"
                  value="separateTutor"
                  checked={formData.separateTutor}
                  onChange={handleInputChange}
                />
                <label htmlFor="separateTutor">Separate Tutors</label>
              </div>
              <div id="sameTutor">
                <input
                  type="checkbox"
                  id="sameTutor"
                  name="sameTutor"
                  value="sameTutor"
                  checked={formData.sameTutor}
                  onChange={handleInputChange}
                />
                <label htmlFor="sameTutor">Same Tutor</label>
              </div>
            </div>

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
              <p>"badminton"</p>
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
            onChange={(e) => setTextOutput1(e.target.value)}
          ></textarea>

          <div className="convert-button">
            <button onClick={convertTeleToMany}>
              Convert to Many Tutors Format
            </button>
            <div className="clip">
              <button
                className="clipboard"
                onClick={() => {
                  copyToClipboard(textOutput1);
                  setCopy("✓ Copied to Clipboard!");
                  setCopy2(" ");
                }}
              >
                Copy to Clipboard
              </button>
              <span>{copy}</span>
            </div>
          </div>
        </div>
        <div className="convert-output-2">
          <div className="convert-output-title-2">Many Tutors Template</div>
          <textarea
            name=""
            id=""
            cols="50"
            rows="30"
            value={textOutput2}
            onChange={(e) => setTextOutput2(e.target.value)}
          ></textarea>

          <div className="convert-button">
            <button onClick={convertManyToTele}>
              Convert to Telegram Format
            </button>
            <div className="clip">
              <button
                className="clipboard2"
                onClick={() => {
                  copyToClipboard(textOutput2);
                  setCopy(" ");
                  setCopy2("✓ Copied to Clipboard!");
                }}
              >
                Copy to Clipboard
              </button>
              <span>{copy2}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Convert;
