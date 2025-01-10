const { Sequelize, QueryType, QueryTypes, where } = require("sequelize");
const config = require("../config/config");
const { SELECT } = require("sequelize/lib/query-types");
const bcrypt = require("bcrypt");
const { types } = require("pg");
const { Myproject, User } = require("../models");
const session = require("express-session");
const fs = require("fs");
// const $ = require("jquery");
const path = require("path");

const Swal = require("sweetalert2");

const saltRound = 10;

const environment = process.env.NODE_ENV;
const sequelize = new Sequelize(config[environment]);

function renderLogin(req, res) {
  const { user } = req.session;
  if (user) {
    res.redirect("/");
  }
  res.render("auth-login");
}

function renderRegister(req, res) {
  const user = req.session.user;
  if (user) {
    res.redirect("/");
  }
  res.render("auth-register");
}

function renderHome(req, res) {
  const { user } = req.session;

  res.render("index", { user });
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;
  const userCheck = await User.findOne({ where: { username } });
  const emailCheck = await User.findOne({ where: { email } });

  if (userCheck) {
    req.flash("error", "User Already Exists.");
    res.redirect("/register");
  } else if (emailCheck) {
    req.flash("error", "Email Already Exists.");
    res.redirect("/register");
  } else {
    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    req.flash("success", "Berhasil Mendaftar silahkan login");
    res.redirect("/login");
  }
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // check if password user axit
  const user = await User.findOne({ where: { email } });

  if (!user) {
    req.flash("error", "User Not Found.");
    return res.redirect("login");
  }
  // cheack password
  const isValidated = await bcrypt.compare(password, user.password);
  if (!isValidated) {
    req.flash("error", "Password incorrect.");
    Swal.fire({
      title: "Edited!",
      text: "Project has been edited .",
      icon: "Success",
      background: "#1d2333",
    });
    return res.redirect("login");
  }

  let loggedInUser = user.toJSON();
  delete loggedInUser.password;

  req.session.user = loggedInUser;
  console.log(loggedInUser);
  req.flash("success", "Berhasil login");
  res.redirect("/");
}

//my project
async function renderMyproject(req, res) {
  const { user } = req.session;
  const myprojects = await Myproject.findAll({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });
  // console.log(myprojects[1]);
  res.render("myproject", { blogs: myprojects, user });
}

function authLogout(req, res) {
  req.session.user = null;

  res.redirect("login");
}

function renderCreatemyproject(req, res) {
  const { user } = req.session;

  if (user) {
    res.render("project-add", { user });
  } else {
    res.redirect("/login");
  }
}

async function updateProject(req, res) {
  // const images = ;

  // console.log("Image Read =", imageRead);
  let user = req.session.user;
  const { id } = req.params;
  const projectEdit = await Myproject.findOne({ where: { id } });
  const image = "http://localhost:3030/" + req.file.path;

  let imagepPath =
    "./uploads/" + projectEdit.image.split("\\").pop().split("/").pop();
  let imageOld = "./uploads/" + image.split("\\").pop().split("/").pop();
  console.log("Image Patch", req.file.path);
  console.log("Image Local", imageOld);
  console.log("Image path", imagepPath);
  if (imagepPath !== imageOld) {
    try {
      fs.unlinkSync(imagepPath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }
  }

  if (projectEdit.user_id === user.id) {
    const { name, sdate, edate, message, technologies } = req.body;
    // const image = req.file.path;
    console.log("Gambar", image);
    const result = await Myproject.update(
      {
        name,
        sdate,
        edate,
        image,
        message,
        technologies,
        updatedAt: sequelize.fn("NOW"),
        // image,
      },
      {
        where: { id: id },
      }
    );
    console.log(result);
    res.redirect("/myproject");
  } else {
    req.flash("error", "Edit your project only");
    res.redirect("/myproject");
  }
}

async function renderProjectEdit(req, res) {
  const { user } = req.session;
  const { id } = req.params;

  const projectEdit = await Myproject.findOne({ where: { id } });
  // console.log("user_id :", projectEdit.user_id);

  if (projectEdit.user_id === user.id) {
    res.render("project-edit", { data: projectEdit, user });
  } else if (projectEdit.user_id !== user.id) {
    req.flash("error", "Access is not permitted");
    res.redirect("/myproject");
  }
}

async function renderProjectDetail(req, res) {
  let { user } = req.session;
  const { id } = req.params;

  const projectDetail = await Myproject.findOne({
    include: {
      model: User,
      as: "user",
      attributes: { exclude: ["password"] },
    },
    where: {
      id: id,
    },
  });

  if (projectDetail === null) {
    res.render("page-404", { message: "Project", user });
  } else {
    // console.log(projectDetail);

    res.render("project-detail", { data: projectDetail, user });
  }
}

async function delProject(req, res) {
  let { user } = req.session;
  const { id } = req.params;
  const projectEdit = await Myproject.findOne({ where: { id } });

  if (projectEdit.user_id === user.id) {
    const result = Myproject.destroy({
      where: { id },
    });

    let imagepPath =
      "./uploads/" + projectEdit.image.split("\\").pop().split("/").pop();

    console.log("Image path", imagepPath);

    try {
      fs.unlinkSync(imagepPath);
      console.log("File deleted!");
    } catch (err) {
      // Handle specific error if any
      console.error(err.message);
    }

    // console.log("Result Query Delete :", result);
    res.redirect("myproject");
  } else {
    res.redirect("myproject");
    req.flash("error", "Delete your project only");
  }
}
async function addProject(req, res) {
  let { user } = req.session;

  const { name, message, technologies = technologies, sdate, edate } = req.body;
  // const image = "http://localhost:3030/Asset/image/mobil.jpg";
  const image = "http://localhost:3030/" + req.file.path;
  // console.log("Hasil Gambar".req.file.path);
  console.log("Gambar upload", req.file);
  const result = await Myproject.create({
    name,
    message,
    technologies,
    sdate,
    edate,
    image,
    user_id: user.id,
    createdAt: sequelize.fn("NOW"),
    updatedAt: sequelize.fn("NOW"),
  });

  res.redirect("myproject");
}

// tesimonial
function renderTestimonial(req, res) {
  const { user } = req.session;
  res.render("testimonial", { user });
}
function renderContact(req, res) {
  const { user } = req.session;
  res.render("contact", { user });
}

function render404(req, res) {
  const { user } = req.session;
  res.render("page-404", { user });
}

module.exports = {
  renderLogin,
  renderRegister,
  authRegister,
  authLogin,
  authLogout,
  renderHome,
  renderMyproject,
  renderCreatemyproject,
  renderProjectDetail,
  renderProjectEdit,
  updateProject,
  renderTestimonial,
  renderContact,
  render404,
  addProject,
  delProject,
};
