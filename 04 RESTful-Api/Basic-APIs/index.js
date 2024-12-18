const express = require("express");
const app = express();
const port = 8080;
const fs = require("fs");
const userData = require("./MOCK_DATA.json");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Learning RESTful API</h1>");
});

// ✅ REST API -----------------------------------------------
app.get("/users", (req, res) => {
  // ✅ according to restful API practice -> this type of route return HTML document
  const users = `
0        ${userData.map((user) => `<li>${user.first_name}</li>`).join("")}
    `;
  res.send(users);
});

//✅ Get all users--------------------------------------------
app.get("/api/users", (req, res) => {
  res.json(userData);
});

// ✅ create new user-----------------------------------------
app.post("/api/users", (req, res) => {
const newUser = req.body;
console.log(newUser);

  //☑️ Check all the fields are given or not
if(
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.email ||
    !newUser.gender ||
    !newUser.job_title
) {
    return res.status(400).json({ error: "All fields are required !" });
  }

  //☑️  now push is data inside usersList
  userData.push({ ...newUser, id: userData.length + 1 });

  //☑️  now update the file
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(userData),
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        return res.status(201).json({ status: "success", id: userData.length });
      }
    }
  );
});

app
  .route("/api/users/:id")
  .get(
    (
      req,
      res // ✅ get individual user information--------
    ) => {
      const id = Number(req.params.id);
      const data = userData.find((user) => user.id === id);
      res.json(data);
    }
  )
  .patch(
    (
      req,
      res // ✅ edit user information  --------------
    ) => {
      const id = Number(req.params.id);

      let { first_name, last_name, email, gender, job_title} = req.body;
      
      if(!first_name ||!last_name ||!email ||!gender ||!job_title) {
        return res.status(400).json({ error: "All fields are required!" });
      }
      
      const updatedUser = userData.map((user) =>
        user.id === id
         ? {...user, first_name, last_name, email, gender, job_title}
          : user);

        //��️  now update the file
        fs.writeFile(
          "./MOCK_DATA.json",
          JSON.stringify(updatedUser),
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(updatedUser);
              return res.status(200).json(updatedUser);
            }
          }
        );
    }
  )
  .delete((req,res) => {
    let id = Number(req.params.id);
    let user = userData.find((users)=> users.id === id);
    
    if( !user) 
    {
       return res.status(400).json( { status : "User not found "});
    }

    const filteredData = userData.filter((user) => user.id !== id);
    
      //☑️  now update the file
      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(filteredData),
        (err) => {
          if (err) {
            console.log(err);
          } else {
            return res.status(201).json({ status: "success", length: userData.length });
          }
        }
      );

    // res.json(filteredData);
    }
  );

app.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Server is running on port ${port}`);
});
