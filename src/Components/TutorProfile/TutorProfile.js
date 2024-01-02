import "./TutorProfile.css";

const TutorProfile = () => {
  return (
    <div className="tutor">
      <div className="form-title">Tutor Form</div>
      <form action="" className="tutor-registration-form">
        {/* Assignment Code Input */}
        <label htmlFor="assignment">Assignment Code</label>
        <input type="text" id="assignment" name="assignment" value="" />

        {/* Full Name */}
        <label htmlFor="name">Full Name</label>
        <input type="text" id="name" name="name" value="" />

        {/* Contact Number */}
        <label htmlFor="contact">Contact Number</label>
        <input type="text" id="contact" name="contact" value="" />

        {/* Age */}
        <label htmlFor="age">Age</label>
        <input type="text" id="age" name="age" value="" />

        {/* Gender */}
        <label htmlFor="gender">Gender</label>
        <div className="radio-input">
          <input type="radio" id="male" name="gender" value="" />
          <label htmlFor="male">Male</label>
        </div>
        <div className="radio-input">
          <input type="radio" id="female" name="gender" value="" />
          <label htmlFor="female">Female</label>
        </div>

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value="" />

        {/* Current Occupation */}
        <label htmlFor="">Occupation</label>
        <div className="radio-input">
          <input type="radio" id="ptt" name="occupation" value="" />
          <label htmlFor="ptt">Part Time/Undergrad Tutor</label>
        </div>
        <div className="radio-input">
          <input type="radio" id="ftt" name="occupation" value="" />
          <label htmlFor="ftt">Full Time/Graduate Tutor</label>
        </div>
        <div className="radio-input">
          <input type="radio" id="moe" name="occupation" value="" />
          <label htmlFor="moe">Ex/Current MOE Teacher</label>
        </div>

        {/* Highest Qualifications */}
        <label htmlFor="qualifications">
          Highest Qualifications and Relevant Institude
        </label>
        <input type="text" id="qualifications" name="qualifications" />

        {/* Years of Experience as a Tutor */}
        <label htmlFor="experience">Years of Experience as a Tutor</label>
        <input type="text" id="experience" name="experience" />

        {/* Students Currently Teaching for Relevant Level/Subject */}
        <label htmlFor="current_students">
          Students Currently Teaching for Relevant Level/Subject
        </label>
        <input type="text" id="current_students" name="current_students" />

        {/* Average Grade Improvements of Students */}
        <label htmlFor="grade_improvements">
          Average Grade Improvements of Students
        </label>
        <input type="text" id="grade_improvements" name="grade_improvements" />

        {/* Able to Prepare Own Materials */}
        <label htmlFor="own_materials">Able to Prepare Own Materials</label>
        <div className="radio-input">
          <input
            type="radio"
            id="yes_own_materials"
            name="own_materials"
            value="yes"
          />
          <label htmlFor="yes_own_materials">Yes</label>
        </div>
        <div className="radio-input">
          <input
            type="radio"
            id="no_own_materials"
            name="own_materials"
            value="no"
          />
          <label htmlFor="no_own_materials">No</label>
        </div>

        {/* Previous Tuition Centre/Schools You Have Taught At (If Any) */}
        <label htmlFor="previous_schools">
          Previous Tuition Centre/Schools You Have Taught At (If Any)
        </label>
        <input type="text" id="previous_schools" name="previous_schools" />

        {/* Additional Helpful Information (Testimonials from Other Students/Clients) */}
        <label htmlFor="additional_info">
          Additional Helpful Information (Testimonials from Other
          Students/Clients)
        </label>
        <textarea id="additional_info" name="additional_info"></textarea>

        {/* Experience Teaching Online? If So, On What Platform(s) */}
        <label htmlFor="online_experience">
          Experience Teaching Online? If So, On What Platform(s)
        </label>
        <input type="text" id="online_experience" name="online_experience" />

        {/* Tutoring Profile */}
        <label htmlFor="tutoring_profile">Tutoring Profile</label>
        <textarea id="tutoring_profile" name="tutoring_profile"></textarea>

        {/* Hourly Rate */}
        <label htmlFor="hourly_rate">Hourly Rate</label>
        <input type="text" id="hourly_rate" name="hourly_rate" />

        {/* Available Timing */}
        <label htmlFor="available_timing">Available Timing</label>
        <input type="text" id="available_timing" name="available_timing" />
      </form>
    </div>
  );
};

export default TutorProfile;
