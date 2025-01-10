const { Sequelize, QueryType, QueryTypes } = require("sequelize");
const { formatDataToWIB } = require("../utils/time");
const config = require("../config/config");
const { SELECT } = require("sequelize/lib/query-types");
const { types } = require("pg");

const sequelize = new Sequelize(config.development);

let blogs = [
  // technologies: ["nodejs", "typescript"],
];

function renderHome(req, res) {
  res.render("index");
}

//my project
async function renderMyproject(req, res) {
  const query = 'SELECT * FROM public."Myprojects" ORDER BY "createdAt" DESC';
  const myprojects = await sequelize.query(query, { type: QueryTypes.SELECT });

  console.log(myprojects);
  res.render("myproject", { blogs: myprojects });
}

function renderCreatemyproject(req, res) {
  const index = req.params.index;
  const dataToEdit = blogs[index];
  res.render("project-add", { data: dataToEdit, index: index });
}

async function updateProject(req, res) {
  const { id } = req.params;
  const { name, sdate, edate, message, technologies } = req.body;
  const query = `UPDATE public."Myprojects"
	SET name='${name}', sdate='${sdate}', edate='${edate}', message='${message}', 
  technologies='${technologies}'
  WHERE id = ${id}
  RETURNING *;
  `;
  const result = await sequelize.query(query, { type: QueryTypes.UPDATE });
  console.log(result);
  res.redirect("myproject");
}
async function renderProjectEdit(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Myprojects" WHERE id = ${id}`;
  const projectEdit = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  console.log(projectEdit[0]);
  res.render("project-edit", { data: projectEdit[0] });
}
async function renderProjectDetail(req, res) {
  const { id } = req.params;
  const query = `SELECT * FROM public."Myprojects" WHERE id = ${id}`;
  const projectDetail = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });
  console.log(projectDetail);
  res.render("project-detail", { data: projectDetail[0] });
}


async function delProject(req, res) {
  const { id } = req.params;
  const query = `DELETE FROM public."Myprojects"
                WHERE id= ${id} `;
              
  const result = await sequelize.query(query, { type: QueryTypes.DELETE });
  console.log("Result Query Delete :", result);
  res.redirect("myproject");
}
async function addProject(req, res) {
  const { name, message, technologies, sdate, edate } = req.body;
  const image = "http://localhost:3030/asset/image/mobil.jpg";
  const query = `INSERT INTO public."Myprojects"
                 (name, message, technologies, sdate, edate, image)
                 VALUES 
                 ('${name}','${message}','${technologies}','${sdate}','${edate}','${image}') 
                 
    `;

  const result = await sequelize.query(query, { type: QueryTypes.INSERT });
  console.log(result);
  res.redirect("myproject");
}

// tesimonial
function renderTestimonial(req, res) {
  res.render("testimonial");
}
function renderContact(req, res) {
  res.render("contact");
}

function render404(req, res) {
  res.render("Halaman ini tidak ada");
}

module.exports = {
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
