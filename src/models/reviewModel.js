const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/reviews.json");

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

class ReviewModel {
  static getAll() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }

  static getByMentor(mentorId) {
    const reviews = this.getAll();
    return reviews.filter((r) => r.mentor_id === mentorId);
  }

  static createReview({ mentor_id, user_id, rating, text }) {
    const reviews = this.getAll();

    const review = {
      id: uuidv4(),
      mentor_id,
      user_id,
      rating,
      text: text || "",
    };

    reviews.push(review);
    fs.writeFileSync(filePath, JSON.stringify(reviews, null, 2));

    return review;
  }
}

module.exports = ReviewModel;
