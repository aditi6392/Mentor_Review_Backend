const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "../data/recommendations.json");

// Ensure file exists
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

class RecommendationModel {
  static getAll() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  }

  static getById(id) {
    return this.getAll().find((r) => r.id === id);
  }

  static create({ mentor_id, student_name, letter }) {
    const recs = this.getAll();

    const rec = {
      id: uuidv4(),
      mentor_id,
      student_name,
      letter,
      created_at: new Date().toISOString(),
    };

    recs.push(rec);
    fs.writeFileSync(filePath, JSON.stringify(recs, null, 2));

    return rec;
  }
}

module.exports = RecommendationModel;
