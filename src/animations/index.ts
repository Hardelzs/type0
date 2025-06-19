import gsap from "gsap";

// Timeline shared across animations
const tl = gsap.timeline();

// 🔹 Preloader Animation
export const preLoaderAnim = (): void => {
  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.inOut",
  })
    .to(".landing", {
      duration: 0.05,
      css: { overflowY: "hidden", height: "90vh" },
    })
    .to(".texts-container", {
      duration: 0,
      opacity: 1,
      ease: "Power3.easeOut",
    })
    .from(".texts-container span", {
      duration: 1.5,
      delay: 1,
      y: 70,
      skewY: 10,
      stagger: 0.4,
      ease: "Power3.easeOut",
    })
    .to(".texts-container span", {
      duration: 1,
      y: 70,
      skewY: -20,
      stagger: 0.2,
      ease: "Power3.easeOut",
    })
    .to(".landing", {
      duration: 0.05,
      css: { overflowY: "hidden", height: "unset" },
    })
    .to("body", {
      duration: 0.1,
      css: { overflowY: "scroll" },
      ease: "power3.inOut",
    })
    .from(".landing__top .sub", {
      duration: 1,
      opacity: 0,
      y: 80,
      ease: "expo.easeOut",
    })
    .to(
      ".preloader",
      {
        duration: 1.5,
        height: "0vh",
        ease: "Power3.easeOut",
        onComplete: mobileLanding,
      },
      "-=2"
    )
    .from(".landing__main .text", {
      duration: 2,
      y: 10,
      opacity: 0,
      stagger: {
        amount: 2,
      },
      ease: "power3.easeInOut",
    })
    .from(".links .item", {
      duration: 0.5,
      opacity: 0,
      delay: window.innerWidth < 763 ? -3 : -0.6,
      stagger: {
        amount: 0.5,
      },
      ease: "expo.easeOut",
      onComplete: animateMainShape,
    })
    .from(".main-circle", {
      duration: 1,
      opacity: 0,
      ease: "power3.easeInOut",
      onComplete: animateShapes,
    })
    .from(".shapes .shape", {
      duration: 1,
      opacity: 0,
      delay: -1,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".preloader", {
      duration: 0,
      css: { display: "none" },
    });
};

// 🔹 Open Menu
export const openMenu = (): void => {
  const tl = gsap.timeline();
  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.out",
  })
    .to(".hamburger-menu", {
      duration: 0.1,
      css: { display: "block" },
    })
    .to(".header-item", {
      duration: 0.1,
      css: { background: "none" },
    })
    .to(".cls-1", {
      duration: 0.1,
      delay: 0.3,
      css: { fill: "#ffffff" },
    })
    .to(
      [".nav-secondary", ".nav-primary"],
      {
        duration: 0.8,
        height: "100%",
        transformOrigin: "right top",
        stagger: {
          amount: 0.1,
        },
        ease: "power3.inOut",
      },
      "-=.5"
    )
    .from(
      ".nav-link",
      {
        duration: 0.5,
        x: -80,
        opacity: 0,
        stagger: {
          amount: 0.5,
        },
        ease: "Power3.in",
      },
      "-=.3"
    );
};

// 🔹 Close Menu
export const closeMenu = (): void => {
  const tl = gsap.timeline();
  tl.to("body", {
    duration: 0.05,
    css: { overflowY: "scroll" },
    ease: "power3.inOut",
  })
    .to([".nav-primary", ".nav-secondary"], {
      duration: 0.8,
      height: "0",
      transformOrigin: "right top",
      stagger: {
        amount: 0.1,
      },
      ease: "power3.inOut",
    })
    .to(".cls-1", {
      duration: 0.1,
      delay: -0.3,
      css: { fill: "#08e7f3" },
    })
    .to(".header-item", {
      duration: 0.5,
      css: { background: "rgba(11,11,15,.8)" },
    })
    .to(".hamburger-menu", {
      duration: 0.05,
      css: { display: "none" },
    });
};

// 🔹 Fade Up
export const fadeUp = (el: string | Element, delay: number = 0): void => {
  tl.from(el, {
    y: 150,
    duration: 1,
    delay,
    opacity: 0,
    ease: "power3.Out",
  });
};

// 🔹 Mobile Landing
export const mobileLanding = (): void => {
  if (window.innerWidth < 763) {
    tl.from(".landing__main2", {
      duration: 1,
      opacity: 0,
      y: 80,
      ease: "expo.easeOut",
    });
  }
};

// 🔹 Animate Shapes
const animateShapes = (): void => {
  const infiniteTl = gsap.timeline({ repeat: -1 });

  infiniteTl
    .to(".shapes .shape", {
      duration: 4,
      rotate: 360,
      delay: -1,
      ease: "power3.easeInOut",
      stagger: 2,
    })
    .to(".shapes .shape-3", {
      duration: 1,
      rotate: 360,
      delay: -2,
      ease: "power3.easeInOut",
    })
    .to(".shapes .shape", {
      duration: 3,
      rotate: 0,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape", {
      duration: 1,
      opacity: 0,
      delay: -1,
      ease: "power3.easeInOut",
      stagger: 1,
    })
    .to(".shapes .shape", {
      duration: 1.5,
      opacity: 1,
      ease: "power3.easeInOut",
      stagger: 1,
    });
};

// 🔹 Animate Main Shape
const animateMainShape = (): void => {
  const infiniteTl = gsap.timeline({ repeat: -1 });

  infiniteTl
    .to(".shapes .main-circle", {
      duration: 6,
      x: -30,
      y: -50,
      ease: "expo.easeOut",
    })
    .to(".shapes .main-circle", {
      duration: 6,
      x: -30,
      y: 50,
      ease: "expo.easeOut",
    })
    .to(".shapes .main-circle", {
      duration: 4,
      x: 0,
      y: 0,
      ease: "expo.easeOut",
    });
};

// 🔹 Box Hover
export const boxHover = (e: React.MouseEvent<HTMLDivElement>): void => {
  const tl = gsap.timeline();

  if (window.innerWidth >= 986) {
    const target = e.currentTarget;
    const link = target.querySelector(".link");
    const boxes = target.querySelectorAll(".box-anim");

    if (link) {
      tl.to(link, { duration: 0, opacity: 1 });
    }

    if (boxes.length > 0) {
      tl.from(boxes, {
        duration: 0.3,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        ease: "Power3.easeOut",
      });
    }
  }
};

// 🔹 Box Exit
export const boxExit = (e: React.MouseEvent<HTMLDivElement>): void => {
  if (window.innerWidth >= 986) {
    const target = e.currentTarget;
    const link = target.querySelector(".link");

    if (link) {
      gsap.to(link, {
        duration: 0,
        opacity: 0,
      });
    }
  }
};

// 🔹 Fade In
export const fadeIn = (el: string | Element): void => {
  gsap.to(el, {
    duration: 2,
    opacity: 1,
    y: -60,
    ease: "power4.out",
  });
};

// 🔹 Fade Out
export const fadeOut = (el: string | Element): void => {
  gsap.to(el, {
    duration: 1,
    opacity: 0,
    y: -20,
    ease: "power4.out",
  });
};
