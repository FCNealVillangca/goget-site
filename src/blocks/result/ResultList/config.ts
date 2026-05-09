import type { Block } from 'payload'

export const ResultList: Block = {
  slug: 'result-list',
  interfaceName: 'ResultListBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Student Results',
    },
    {
      name: 'limit',
      type: 'number',
      defaultValue: 12,
      admin: {
        description: 'Maximum number of results to show',
      },
    },
  ],
  labels: {
    plural: 'Result Lists',
    singular: 'Result List',
  },
}
