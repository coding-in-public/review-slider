let reviews;
let slideIndex = 0;

function loadStars(stars){
  const calculatedStars = [];
  for (let i = 0; i < Math.floor(stars); i++){
    calculatedStars.push(`<img src="images/full-star.svg">`);
  }
  if(stars === 5){
    return calculatedStars.map((item) => item).join('');
  }
  if(Number.isInteger(stars)){
    for (let i = 0; i < 5 - stars; i++){
      calculatedStars.push(`<img src="images/empty-star.svg">`);
    }
  } else {
    calculatedStars.push(`<img src="images/half-star.svg">`);
    for (let i = 0; i < 4 - Math.floor(stars); i++){
      calculatedStars.push(`<img src="images/empty-star.svg">`);
    }
  }
  return calculatedStars.map((item) => item).join('');
}

function loadReviews(review){
  return `
    <div class="review">
    <div class="review__headshot">
      <img src="${review.headshot}" alt="${review.name}">
    </div>
    <p class="review__name"><strong>${review.name}</strong></p>
    <p class="review__location">${review.location}</p>
    <div class="review__stars">${loadStars(review.stars)}</div>
    <p class="review__body">${review.body}</p>
  </div>
    `;
}

function moveSlider(e){
  if(e.currentTarget.id.includes('right')){
    slideIndex === reviews.length - 1 ? (slideIndex = 0) : slideIndex++;
  } else {
    slideIndex === 0 ? (slideIndex = reviews.length - 1) : slideIndex--;
  }
  document.querySelector('.reviews').style.transform = `translate(${-100 * slideIndex}%)`;
}

// 1. Fetch the 'data' from our API
async function fetchReviews() {
  await fetch('reviews.json')
  .then((response) => {
    if (!response.ok) {
    throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => {
    reviews = data;
    // 2. Parse the data and create the 'review' divs
    document.querySelector('.reviews').innerHTML = data.map(loadReviews).join('');
  })
  .catch((error) => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}
fetchReviews();

// 3. Add event listeners to move the slider left and right
document.querySelector('#arrow--right').addEventListener('click', moveSlider);
document.querySelector('#arrow--left').addEventListener('click', moveSlider);






