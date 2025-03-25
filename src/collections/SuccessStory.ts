import { CollectionConfig } from 'payload'

const SuccessStory: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role/Position',
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company',
    },
    {
      name: 'testimonial',
      type: 'textarea',
      required: true,
      label: 'Testimonial',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
    },
  ],
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
}

export default SuccessStory
