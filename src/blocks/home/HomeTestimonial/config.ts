import type { Block } from 'payload'

export const HomeTestimonial: Block = {
  slug: 'home-testimonial',
  interfaceName: 'HomeTestimonialBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'What our clients say',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling.',
    },
  ],
  labels: {
    plural: 'Home Testimonials',
    singular: 'Home Testimonial',
  },
}
