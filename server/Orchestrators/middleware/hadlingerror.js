module.exports= (err,req,res,next)=> {
  console.log(err.name)
  switch (err.name) {
    case 'NotFoundError':
      res.status(404).json({message: err.message})
      break;
  
    default:
      res.status(500).json({message: 'internal Server error'})
      break;
 }
}