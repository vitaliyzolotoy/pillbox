export const dbData = {
  schedule: [
    {
      id: 1,
      name: 'Morn',
      fullName: 'Morning',
      receptums: [
        {
          name: 'Fluanxol',
          dose: 100,
          quantity: 1,
          repeat: true,
          day: ''
        },
        {
          name: 'Amitryptylin',
          dose: 500,
          quantity: 2,
          repeat: false,
          day: 'mon'
        },
        {
          name: 'Depakine',
          dose: 200,
          quantity: 1,
          repeat: false,
          day: 'mon'
        },
        {
          name: 'Zolofren',
          dose: 100,
          quantity: 0.5,
          repeat: false,
          day: 'fri'
        }
      ]
    },
    {
      id: 2,
      name: 'Noon',
      fullName: 'Afternoon',
      receptums: []
    },
    {
      id: 3,
      name: 'Eve',
      fullName: 'Evening',
      receptums: []
    },
    {
      id: 4,
      name: 'Bed',
      fullName: 'Bedtime',
      receptums: []
    }
  ]
};
