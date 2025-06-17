const {generateQuestion, flipQuestions} = require('../utils/generateQuestions')
const Questions = require("../models/question");

async function handleGenerateQuestions(req, res) {
  console.log("in handle generate questions : ", req.body);
  try {
    const questions = await generateQuestion();
    if(!questions){
      return res.status(500).json({message : "Failed to generate questions please try again"})
    }
    await Questions.create({
        questions,
        createdFor: req.user._id
    })
    return res.status(200).json({ message: "Questions generated", questions });
  } catch (err) {
    console.log("Error occured :", err);
  }
}
async function handleFlipQuestions(req, res) {
  console.log("in handle flip")

  try {
    console.log("in handle flip questions : ",req.body);
    const question = await flipQuestions(
      req.body.id,
      req.body.amount,
      req.body.category
    );
    if(!question){
      return res.status(500).json({message : "Failed to generate a new questions please try again"})
    }
    return res.status(200).json({ message: "New Questions generated", question });
  } catch (error) {
    console.log("Error occured :", error)
  }
}

module.exports = {
  handleGenerateQuestions,
  handleFlipQuestions,
};
