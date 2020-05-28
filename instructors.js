const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");
const Intl = require("intl");

exports.index = (req, res) => {
  return res.render("instructors/index", { instructors: data.instructors });
};

//Create
exports.post = (req, res) => {
  const keys = Object.keys(req.body);
  for (key of keys) {
    req.body[key];
    if (req.body[key] == "") return res.send("Please, check all fields");
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length) + 1;

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error");
    return res.redirect("/");
  });
};

//Show one
exports.show = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundInstructor.created_at
    ),
  };

  return res.render("instructors/show", { instructor });
};

//Edit
exports.edit = (req, res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth),
  };

  return res.render("instructors/edit", { instructor });
};

//Put = save
exports.put = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (id == instructor.id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructors[index] = instructor;
  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write error!");
    return res.redirect(`/instructors${id}`);
  });
};

//Delete
exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter((instructor) => {
    return instructor.id != id;
  });

  data.instructors = filteredInstructors;

  fs.writeFile(
    "data.json",
    JSON.stringify(data, null, (err) => {
      if (err) return res.send("Write File ERROR");

      return res.redirect("/instructors");
    })
  );
};
