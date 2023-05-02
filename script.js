let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

// Dark/Mode Toggle Slider
function slideRight() {
  reset ();
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  images[currentIndex].classList.add('active');
}

const body = document.querySelector('body');
const modeToggle = document.getElementById('mode-toggle');
const modeStatus = document.querySelector('.mode-status');
function toggleMode() {
body.classList.toggle('light-mode');

const modeMessage = body.classList.contains('light-mode') ?
    'LIGHT Mode'
    : "DARK Mode"

modeStatus.innerText = "Currently in " + modeMessage;
  }

modeToggle.addEventListener('click', toggleMode);

//Testimonial Data
const testimonials = [
  {
    name: "Katy Ho",
    job: "Developer, Digital Ads",
    image: "https://images.pexels.com/photos/4926674/pexels-photo-4926674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    testimonial:
      "Lorem ipsum dolor sit amet. Nam libero minus et dolorum necessitatibus in deserunt consequatur rem natus galisum ea quidem quidem.",
  },
  {
    name: "Robbie Foster",
    job: "CEO, Techweb Designs ",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=400",
    testimonial:
      "Eos omnis temporibus vel eveniet iusto sed Quis Quis ad quos sunt nam voluptas dignissimos. Hic modi incidunt vel quam itaque id animi adipisci est voluptas galisum. ",
  },
  {
    name: "Benjamin Velasquez",
    job: "Business Owner, Fashion Ecommerce",
    image: "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg?auto=compress&cs=tinysrgb&w=400",
    testimonial:
      "Sit accusamus repudiandae et illo nihil aut beatae quae sit dolores consequuntur vel adipisci dolor aut officiis sunt et dolores mollitia. Hic voluptatem atque aut tempora aspernatur aut dolor quas.",
  },
];


//Current Slide
let i = 0;
//Total Slides
let j = testimonials.length;
let testimonialContainer = document.getElementById("testimonial-container");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");
nextBtn.addEventListener("click", () => {
  i = (j + i + 1) % j;
  displayTestimonial();
});
prevBtn.addEventListener("click", () => {
  i = (j + i - 1) % j;
  displayTestimonial();
});
let displayTestimonial = () => {
  testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
    <h6>${testimonials[i].job}</h6>
  `;
};
window.onload = displayTestimonial;

//Contact Form Validation with firebase

// Initialize Firebase
let firebaseConfig = {
  apiKey: "AIzaSyAdvZCGx4J_Bo1_Xi9G7mhKrCLnNLLrk4o",
  authDomain: "personal-project-a3cc8.firebaseapp.com",
  projectId: "personal-project-a3cc8",
  storageBucket: "personal-project-a3cc8.appspot.com",
  messagingSenderId: "59175862508",
  appId: "1:59175862508:web:907bd1cc64f4a7534565c9",
  measurementId: "G-41498K2VMC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
let database = firebase.database();

function validateForm() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();

  // Name validation
  if (name === "") {
    alert("Name field is required.");
    return false;
  }

  // Email validation
  if (email === "") {
    alert("Email field is required.");
    return false;
  } else {
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email address.");
      return false;
    }
  }

  // Message validation
  if (message === "") {
    alert("Message field is required.");
    return false;
  }

  // Save form data to Firebase
  saveFormData(name, email, message);

  return false; // Prevent form submission for now
}

function saveFormData(name, email, message) {
  // Generate a unique key for the form submission
  let submissionKey = database.ref().child('submissions').push().key;

  // Create the data object to be saved
  let formData = {
    name: name,
    email: email,
    message: message
  };

 // Save the form data to the Firebase database
  const updates = {};
  updates["/submissions/" + submissionKey] = formData;
  database
    .ref()
    .update(updates)
    .then(() => {
      // Display success message
      const formContainer = document.getElementById("form-container");
      formContainer.innerHTML = "<p>Form submitted successfully!</p>";
    })
    .catch((error) => {
      // Display error message
      console.error("Error saving form data:", error);
      const formContainer = document.getElementById("form-container");
      formContainer.innerHTML =
        "<p>An error occurred while submitting the form. Please try again later.</p>";
    });
}

//Graph using d3.js
// Define the data to be used for the chart
const data = [
  { country: 'United States', population: 332 },
  { country: 'China', population: 1444 },
  { country: 'India', population: 1392 },
  { country: 'Indonesia', population: 276 },
  { country: 'Pakistan', population: 225 },
  { country: 'Brazil', population: 213 },
  { country: 'Nigeria', population: 211 },
  { country: 'Bangladesh', population: 166 },
  { country: 'Russia', population: 146 },
  { country: 'Mexico', population: 130 }
];

// Define variables for the chart dimensions and scales
const margin = { top: 20, right: 20, bottom: 60, left: 60 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Create a band scale for the x-axis
const x = d3.scaleBand()
  .domain(data.map(d => d.country))
  .range([0, width])
  .padding(0.2);

// Create a linear scale for the y-axis
const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.population)])
  .range([height, 0]);

// Create an SVG element for the chart, define its width and height, and append a group element to it
const svg = d3.select('#chart')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom + 20)
  .append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

// Create rectangles for each data point and add interactivity with mouseover and mouseout events
svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', d => x(d.country))
  .attr('width', x.bandwidth())
  .attr('y', d => y(d.population))
  .attr('height', d => height - y(d.population))
  .attr('fill', 'steelblue')
  .on("mouseover", function (d) {
    d3.select(this).style("fill", "#5db0f5");
  })
  .on("mouseout", function (d) {
    d3.select(this).style("fill", "steelblue");
  });

// Add x-axis labels to the chart
svg.append('g')
  .attr('transform', `translate(0,${height})`)
  .call(d3.axisBottom(x))
  .selectAll('text')
  .style('text-anchor', 'end')
  .attr('dx', '-.8em')
  .attr('dy', '.15em')
  .attr('transform', 'rotate(-65)');

// Add y-axis labels to the chart
svg.append('g')
  .call(d3.axisLeft(y));  

  
