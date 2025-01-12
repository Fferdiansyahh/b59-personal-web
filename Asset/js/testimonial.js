let testimonials = [
  {
    author: "Ferdian",
    rating: 5,
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in gravida sem, condimentum sagittis justo. Vestibulum nulla felis, fringilla at molestie in, laoreet ac libero. ",
    image: "Project_4.png",
  },
  {
    author: "User",
    rating: 4,
    content:
      "Mauris rhoncus tempor lorem in convallis. Integer ornare massa vitae arcu tristique tristique. Nullam non diam at velit egestas auctor faucibus ut ex. Curabitur bibendum tincidunt arcu et rutrum. ",
    image: "Project_4.png",
  },
  {
    author: "Joko",
    rating: 3,
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea reiciendis qui molestias blanditiis inventore reprehenderit nesciunt sequi pariatur quaerat? Error?",
    image: "Project_4.png",
  },
  {
    author: "Iqbal",
    rating: 4,
    content:
      "Vestibulum pulvinar pretium fermentum. Nullam at felis maximus, iaculis nunc in, rutrum nunc. Fusce a velit eget magna rutrum dignissim. Cras venenatis augue tellus, id volutpat ante blandit hendrerit. ",
    image: "Project_4.png",
  },
  {
    author: "Tsabit",
    rating: 5,
    content:
      "Vestibulum pulvinar pretium fermentum. Nullam at felis maximus, iaculis nunc in, rutrum nunc. Fusce a velit eget magna rutrum dignissim. Cras venenatis augue tellus, id volutpat ante blandit hendrerit. ",
    image: "Project_4.png",
  },
];

const testimonialsContainer = document.getElementById(`testimonialsContainer`);

const testimonialsHTML = (daftarTestimoni) => {
  return daftarTestimoni
    .map(
      (testimonial) => `
      <div class="d-flex justify-content-center my-3">
          <div class="card p-5 col mx-0">
              <img src="/Asset/image/${testimonial.image}" class="card-img-top" alt="..." />
              <div class="card-body px-0">
                <div class="overflow-scroll" style="height: 120px">
                  <p class="card-text">${testimonial.content}</p>
                </div>
                <div class="text-end fw-bold mt-3">
                  <p>- ${testimonial.author}</p>
                  <p>${testimonial.rating}✯</p>
                </div>
              </div>
          </div>
      </div>`
    )
    .join("");
};

function showAllTestimonials() {
  testimonialsContainer.innerHTML = testimonialsHTML(testimonials);
}

showAllTestimonials();

function filterTestimonialByStar(rating) {
  const filteredTestimonial = testimonials.filter(
    (testimonial) => testimonial.rating === rating
  );

  console.log(filteredTestimonial);

  if (filteredTestimonial.length === 0) {
    return (testimonialsContainer.innerHTML = `<div class="w-100 text-center"><h5>No testimonials.</h5></div>`);
  }

  setTimeout(() => {
    testimonialsContainer.innerHTML = testimonialsHTML(filteredTestimonial);
  }, 1000);
}
