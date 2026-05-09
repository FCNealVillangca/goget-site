import type { Block } from 'payload'

export const HomeStruggle: Block = {
  slug: 'home-struggle',
  interfaceName: 'HomeStruggleBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Why you are struggling with French',
    },
    {
      name: 'subheading',
      type: 'textarea',
      required: true,
      defaultValue: 'Our state-of-the-art facilities and innovative technology support e-commerce fulfillment and project cargo handling.',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Globe', value: 'globe' },
            { label: 'Package', value: 'package' },
            { label: 'Truck', value: 'truck' },
            { label: 'Bar Chart', value: 'barchart3' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      defaultValue: [
        {
          title: 'E-commerce Fulfillment',
          description: 'Fast and reliable order fulfillment services designed for online retailers, ensuring timely delivery and customer satisfaction.',
          icon: 'package',
          image: null,
        },
        {
          title: 'Freight Forwarding',
          description: 'International freight forwarding with customs clearance, documentation, and door-to-door delivery solutions.',
          icon: 'truck',
          image: null,
        },
        {
          title: 'Supply Chain Management',
          description: 'From freight forwarding & customs brokerage to warehousing solutions and supply chain management, our expertise ensures that your logistics operations are seamless and efficient.',
          icon: 'globe',
          image: null,
        },
        {
          title: 'Warehouse Solutions',
          description: 'State-of-the-art warehouse facilities with inventory management, order processing, and distribution center services.',
          icon: 'barchart3',
          image: null,
        },
      ],
    },
  ],
  labels: {
    plural: 'Home Struggles',
    singular: 'Home Struggle',
  },
}