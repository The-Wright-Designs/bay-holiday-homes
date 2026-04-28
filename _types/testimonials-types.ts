export interface Testimonial {
  meta_box: {
    type: "happy_clients" | "happy_guests";
    testimonial: string;
    author: string;
    stars: string;
  };
}

export interface TestimonialsSliderProps {
  cssClasses?: string;
  testimonials: Testimonial[];
}
