const { CandidateModel } = require("../models/candidates.model");
const UserModel = require("../models/user.model");

const referCandidate = async (req, res) => {
  try {
    const { userId } = req.user;
    const { email, name, mobile, jobTitle } = req.body;
    if (!email.trim() || !name.trim() || !mobile.trim() || !jobTitle.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const candidate = await CandidateModel.findOne({ email, jobTitle });
    if (candidate) {
      return res
        .status(409)
        .json({ message: "Candidate already referred for this role." });
    }
    // console.log(1)
    const referral = await CandidateModel.create({
      email,
      name,
      mobile,
      jobTitle,
      referredBy: userId,
    });
    // console.log(2,typeof userId)
    let user = await UserModel.findOne({ userId });
    // console.log(3,user)
    user.referrals.push(referral._id);
    // console.log(5)
    await user.save();
    // console.log(6)
    res.status(201).json({ message: "Successfully referred" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, try again later", error });
  }
};

const candidatesReffered = async (req, res) => {
  try {
    const { userId } = req.user;
    const role = req.role;
    if (role === "admin") {
      const refs = await CandidateModel.find();
      return res.status(200).json({ message: "Referred candidates", refs });
    }
    const refs = await CandidateModel.find({ referredBy: userId });
    res.status(200).json({ message: "Referrence list", refs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
};

const updateRef = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !status.trim()) {
      return res.status(400).json({ message: "Please provide a valid status" });
    }
    const candidate = await CandidateModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ message: "No candidate found" });
    }
    res.status(200).json({ message: `Status updated` });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const {userId} = req.user;
    const candidate = await CandidateModel.findById(id);
    if (!candidate) {
      return res.status(404).json({ message: "No candidate found" });
    }
    if (candidate.referredBy.toString() === userId) {
      await CandidateModel.findByIdAndDelete(id);
      await UserModel.updateOne(
        { _id: req.user },
        { $pull: { referrals: id } }
      );
      return res.status(200).json({ message: "Candidate deleted" });
    }
    res.status(401).json({ message: "Unauthorized action" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong, please try again" });
  }
};

module.exports = {
  referCandidate,
  updateRef,
  candidatesReffered,
  deleteCandidate,
};
