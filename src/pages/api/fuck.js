

export default async function handler(req, res) {
  

  switch (req.method) {
    case 'POST':
      console.log(req.body)
      
      break

    case 'PATCH':
      console.log('PAATCHHHHHHHHHHH fuck')
      console.log(req.body)
      console.log(req.files)
  
      const { updateData } = req.body
      const itemId  = req.body.itemId
      
      break
    default:
      res.setHeader('Allow', ['POST', 'PATCH'])
  }

}