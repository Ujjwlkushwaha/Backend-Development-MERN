const express = require("express");
const app = express();
const port = 8080;
const userRouter = require("./routes/user");
app.use(express.urlencoded({ extended: true }));


app.use('/users' , userRouter );

app.get('/' , (req , res) =>{
  res.send('Hello from the backend');
})

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server is running on port ${port}`);
});
