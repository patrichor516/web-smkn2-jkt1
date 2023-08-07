$('.slide-image').each(function() {
  var bg = $(this).data('bg');
  var pos = $(this).data('flex-start');
  $(this).css({
    "background-image" : "url("+bg+")",
    "transform-origin": pos,
  });
});

var $slider = $('.flex-slider').flexslider({
  slideshow: true,
  slideshowSpeed: 6000,
  animationSpeed: 1000,
  controlNav: false,
  manualControls: '.flex-dots .dot', // Menentukan elemen dot sebagai manual control
  start: function (slider) {
    // Inisialisasi dot ketika slider dimulai
    createDots(slider);
    // Set dot pertama sebagai aktif
    updateActiveDot(slider, 0);
  },
  after: function (slider) {
    // Update dot setelah slide berubah
    updateActiveDot(slider, slider.currentSlide);
  },
  pauseOnAction: true,
});

// Function to create dots
function createDots(slider) {
  var $dotsContainer = $('.flex-dots');
  $dotsContainer.empty();

  for (var i = 0; i < slider.count; i++) {
    var dot = $('<span class="dot"></span>');
    $dotsContainer.append(dot);
  }

  // Set event klik untuk setiap dot
  $('.dot').click(function () {
    var index = $(this).index();
    slider.flexAnimate(index); // Animasikan slide berdasarkan klik dot
  });
}

// Function to update active dot
function updateActiveDot(slider, currentSlide) {
  $('.dot').removeClass('active');
  $('.dot').eq(currentSlide).addClass('active');
}
// Function to start the interval for slide and dot animation
function startAnimationInterval(slider) {
  setInterval(function () {
    var currentSlide = slider.currentSlide;
    var nextSlide = (currentSlide + 1) % slider.count;

    // Animate the slide
    slider.flexAnimate(nextSlide, true);

    // Animate the dot
    updateActiveDot(slider, nextSlide);
  }, 5000); // Interval should be the same as slideshowSpeed
}



$(window).scroll(function () {
    if ($(this).scrollTop() > 45) {
        $('.navbar').addClass('sticky-top shadow-sm');
    } else {
        $('.navbar').removeClass('sticky-top shadow-sm');
    }
});

// Dropdown on mouse hover
const $dropdown = $(".dropdown");
const $dropdownToggle = $(".dropdown-toggle");
const $dropdownMenu = $(".dropdown-menu");
const showClass = "show";

$(window).on("load resize", function() {
    if (this.matchMedia("(min-width: 992px)").matches) {
        $dropdown.hover(
        function() {
            const $this = $(this);
            $this.addClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "true");
            $this.find($dropdownMenu).addClass(showClass);
        },
        function() {
            const $this = $(this);
            $this.removeClass(showClass);
            $this.find($dropdownToggle).attr("aria-expanded", "false");
            $this.find($dropdownMenu).removeClass(showClass);
        }
        );
    } else {
        $dropdown.off("mouseenter mouseleave");
    }
});