export interface Testimonial {
  testimonial: string;
  author: string;
  stars: number;
}

export interface TestimonialsSliderProps {
  cssClasses?: string;
  testimonials: Testimonial[];
}
