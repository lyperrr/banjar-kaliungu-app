// Container untuk stagger animation
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Item (badge, title, text, button)
export const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Floating shape animation
export const floatingShape = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.6, 0.3],
  },
  transition: {
    duration: 6,
    repeat: Infinity,
  },
};

// Scroll indicator (mouse)
export const scrollIndicator = {
  animate: {
    y: [0, 10, 0],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
  },
};

// Item dari KIRI → KANAN
export const itemLeftVariants = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Card tengah → fade + scale
export const itemStatCenter = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Item dari KANAN → KIRI
export const itemRightVariants = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};