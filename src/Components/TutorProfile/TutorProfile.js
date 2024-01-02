import "./TutorProfile.css";

const TutorProfile = () => {
  return (
    <div className="tutor">
      <form action="">
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
        <input type="text" id="gender" name="gender" value="" />

        {/* Email */}
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value="" />

        {/* Current Occupation */}
        <input type="radio" id="ptt" name="occupation" value="" />
        <label htmlFor="ptt">Part Time/Undergrad Tutor</label>
        <input type="radio" id="ftt" name="occupation" value="" />
        <label htmlFor="ftt">Full Time/Graduate Tutor</label>
        <input type="radio" id="moe" name="occupation" value="" />
        <label htmlFor="moe">Ex/Current MOE Teacher</label>
      </form>
    </div>
  );
};

export default TutorProfile;
