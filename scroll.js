const pixelsTag = document.querySelector('div.pixels')
const bodyTag = document.querySelector('body')
const progressTag = document.querySelector('div.progress')
const sections = document.querySelectorAll('section')
const clientTag = document.querySelector('div.client')
const pageTag = document.querySelector('div.page')
const headerTag = document.querySelector('header')

// when we scroll the page, update the pixels tab to be how far we've scrolled
document.addEventListener('scroll', function () {
  const pixels = window.pageYOffset

  pixelsTag.innerHTML = pixels
})

// when we scroll the page, make a progress bar that keeps track of the change

document.addEventListener('scroll', function () {
  const pixels = window.pageYOffset
  const pageHeight = bodyTag.getBoundingClientRect().height
  const totalScrollableDistance = pageHeight - window.innerHeight

  const percentage = pixels / totalScrollableDistance

  progressTag.style.width = `${100 * percentage}%`
})

// when we scroll the page, see how far down the page we've scrolled
// then for each section check to see if we've passed that section and if we have...
// then update the text in the header

document.addEventListener('scroll', function () {
  const pixels = window.pageYOffset

  sections.forEach((section) => {
    if (section.offsetTop - 60 <= pixels) {
      clientTag.innerHTML = section.getAttribute('data-client')
      pageTag.innerHTML = section.getAttribute('data-page')

      if (section.hasAttribute('data-is-dark')) {
        headerTag.classList.add('white')
        progressTag.classList.add('white')
      } else {
        headerTag.classList.remove('white')
        progressTag.classList.remove('white')
      }
    }
  })
})

// when we scroll the page, make things parallax
// we want to move certain tags, based on how far they are from the anchor point
// what is the anchor? it's the middle of the section
// how far should be parallax? it's a ratio of the distance scrolled to the middle point

document.addEventListener('scroll', function () {
  const topViewport = window.pageYOffset
  const midViewport = topViewport + window.innerHeight / 2

  sections.forEach(section => {
    const topSection = section.offsetTop
    const midSection = topSection + section.offsetHeight / 2

    const distanceToSection = midViewport - midSection

    const parallaxTags = section.querySelectorAll(`[data-parallax]`)

    // loop over each parallax tag
    parallaxTags.forEach(tag => {
        const speed = parseFloat(tag.getAttribute("data-parallax"))
        tag.style.transform = `translate(0 , ${distanceToSection * speed}px)`
    })    
  })
})
