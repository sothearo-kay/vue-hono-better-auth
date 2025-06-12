export const fadeTransition = {
  enterFromClass: "opacity-0 scale-95",
  enterActiveClass: "transition-all duration-300 ease-out",
  enterToClass: "opacity-100 scale-100",
  leaveFromClass: "opacity-100 scale-100",
  leaveActiveClass: "transition-all duration-200 ease-in",
  leaveToClass: "opacity-0 scale-95",
};

export const slideTransition = {
  enterFromClass: "opacity-0 translate-y-4",
  enterActiveClass: "transition-all duration-400 ease-out",
  enterToClass: "opacity-100 translate-y-0",
  leaveFromClass: "opacity-100 translate-y-0",
  leaveActiveClass: "transition-all duration-200 ease-in",
  leaveToClass: "opacity-0 -translate-y-4",
};

export const formSwitchTransition = {
  enterFromClass: "opacity-0 translate-x-8 scale-95",
  enterActiveClass: "transition-all duration-300 ease-out delay-100",
  enterToClass: "opacity-100 translate-x-0 scale-100",
  leaveFromClass: "opacity-100 translate-x-0 scale-100",
  leaveActiveClass: "transition-all duration-200 ease-in",
  leaveToClass: "opacity-0 -translate-x-8 scale-95",
};

export const flyTransition = {
  enterFromClass: "opacity-0 -translate-y-2",
  enterActiveClass: "transition-all duration-300 ease-out",
  enterToClass: "opacity-100 translate-y-0",
  leaveFromClass: "opacity-100 translate-y-0",
  leaveActiveClass: "transition-all duration-200 ease-in",
  leaveToClass: "opacity-0 -translate-y-2",
};