
const putImage = (tdElement,imageURL , token) => {
  const src = imageURL
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "image/*"
    }
  };
  //console.log('SRC', src)
  //console.log('options', options)
  fetch(src, options)
  .then(res => res.blob())
  .then(blob => {
   let imageSrc = URL.createObjectURL(blob);
  // console.log('imageSrc', imageSrc)
   console.log('blobnum1', blob)
   if (imageSrc) {
      const image = document.createElement("img")
      image.onload= function(){
        URL.revokeObjectURL(this.src)
        image.height= 70
      image.width= 70
        tdElement.replaceChildren(image)
      }
        
     
      image.src = imageSrc
     // console.log('imageSRC',imageSrc)
      
  }else{
    console.log('no image')
  }
  });
}
async function buildArtCollectiblesTable(ArtCollectiblesTable, ArtCollectiblesTableHeader, token, message) {
    try {
      const response = await fetch("/api/v1/ArtCollectibles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('dataaaaaa', data)
      var children = [ArtCollectiblesTableHeader];
      if (response.status === 200) {
        if (data.count === 0) {
          ArtCollectiblesTable.replaceChildren(...children); // clear this for safety
          return 0;
        } else {

          for (let i = 0; i < data.ArtCollectibles.length; i++) {
            let editButton = `<td><button type="button" class="editButton" data-id=${data.ArtCollectibles[i]._id} >edit</button></td>`;
            let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.ArtCollectibles[i]._id}>delete</button></td>`;
            let rowHTML = `<td id="${'image'+i.toString()}">no image</td><td>${data.ArtCollectibles[i].artist}</td><td>${data.ArtCollectibles[i].title}</td><td>${data.ArtCollectibles[i].paintingType}</td><td>${data.ArtCollectibles[i].price}</td><td>${data.ArtCollectibles[i].description}</td><td>${data.ArtCollectibles[i].freeShipping}</td><td>${data.ArtCollectibles[i].inventory}</td>${editButton}${deleteButton}`;
            let rowEntry = document.createElement("tr");
            rowEntry.innerHTML = rowHTML;
            children.push(rowEntry);
            
          }
          ArtCollectiblesTable.replaceChildren(...children);
          for (let i = 0; i < data.ArtCollectibles.length; i++) {
          if (data.ArtCollectibles[i].imageURL) {
           // console.log('rowHTML' , rowHTML)
            //console.log('imageString','image'+i.toString() )
              const imgTableData = document.getElementById('image'+i.toString())
             // console.log('imageTableData',imgTableData)
              putImage(imgTableData,data.ArtCollectibles[i].imageURL,token)
      }}
        }
        return data.count;
      } else {
        message.textContent = data.msg;
        return 0;
      }
    } catch (err) {
      message.textContent = "A communication error occurred.";
      console.log(err)
      return 0;
    }
  }

  

  async function buildAllArtCollectiblesTable(ArtCollectiblesTable, ArtCollectiblesTableHeader, message) {
    
    try {
      const response = await fetch("/api/v1/allArts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      
   let data = await response.json();
   // console.log('here you are',data)
      var children = [ArtCollectiblesTableHeader];
      if (response.status === 200) {
        if (data.count === 0) {
          ArtCollectiblesTable.replaceChildren(...children); // clear this for safety
          return 0;
        } else {
          for (let i = 0; i < data.ArtCollectibles.length; i++) {
            let image = "no image";
            if(data.ArtCollectibles[i].imageURL){
              image = `<img src=\"${data.ArtCollectibles[i].imageURL }" hight="70" width="70">`
            }
            let cartButton = `<td><button type="button" class="Cart"  data-id=${data.ArtCollectibles[i]._id}>Add to Cart</button></td>`;
           // let orderButton = `<td><button type="button" class="order" data-id=${data.ArtCollectibles[i]._id}>Process Order</button></td>`;
            let rowHTML = `<td>${image}</td><td>${data.ArtCollectibles[i].artist}</td><td>${data.ArtCollectibles[i].title}</td><td>${data.ArtCollectibles[i].paintingType}</td><td>${data.ArtCollectibles[i].price}</td><td>${data.ArtCollectibles[i].description}</td><td>${data.ArtCollectibles[i].freeShipping}</td><td>${data.ArtCollectibles[i].inventory}</td>${cartButton}`;
            let rowEntry = document.createElement("tr");
            rowEntry.innerHTML = rowHTML; 
            children.push(rowEntry);
          }
          ArtCollectiblesTable.replaceChildren(...children);
        }
        return data.count;
      } else {
        message.textContent = data.msg;
        return 0;
      }
    } catch (err) {
      console.log('error on 79', err)
      message.textContent = "A communication error occurred.";
      return 0;
    }
    }

    async function buildAdminTable(AdminTable, AdminTableHeader, token, message) {
      try {
        const response = await fetch("/api/v1/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        //console.log('dataaaaaa', data)
        var children = [AdminTableHeader];
        if (response.status === 200) {
          if (data.count === 0) {
            Admin.replaceChildren(...children); // clear this for safety
            return 0;
          } else {
  
            for (let i = 0; i < data.users.length; i++) {
              
              //let editButton = `<td><button type="button" class="editButton" data-id=${data.ArtCollectibles[i]._id} >edit</button></td>`;
              let deleteButton = `<td><button type="button" class="AdmindeleteButton" data-id=${data.users[i]._id}>delete</button></td>`;
              let rowHTML = `<td>${data.users[i].name}</td><td>${data.users[i].email}</td><td>${data.users[i].role}</td>${deleteButton}`;
              let rowEntry = document.createElement("tr");
              rowEntry.innerHTML = rowHTML;
              children.push(rowEntry);
              
            }
            AdminTable.replaceChildren(...children);
        
          }
          return data.count;
        } else {
          message.textContent = data.msg;
          return 0;
        }
      } catch (err) {
        message.textContent = "A communication error occurred.";
        console.log(err)
        return 0;
      }
    }

document.addEventListener("DOMContentLoaded", () => {
    const logoff = document.getElementById("logoff");
    const message = document.getElementById("message");
    const logonRegister = document.getElementById("logon-register");
    const logon = document.getElementById("logon");
    const register = document.getElementById("register");
    const logonDiv = document.getElementById("logon-div");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const logonButton = document.getElementById("logon-button");
    const logonCancel = document.getElementById("logon-cancel");
    const registerDiv = document.getElementById("register-div");
    const name = document.getElementById("name");
    const email1 = document.getElementById("email1");
    const password1 = document.getElementById("password1");
    const password2 = document.getElementById("password2");
    const roleEntry = document.getElementById("role");
    const admin = roleEntry[0].value;
    const artist = roleEntry[1].value
    const adminButton = document.getElementById('Admin-button')
    const registerButton = document.getElementById("register-button");
    const registerCancel = document.getElementById("register-cancel");
    const ArtCollectibles = document.getElementById("ArtCollectibles");
    const ArtCollectiblesTable = document.getElementById("ArtCollectibles-table");
    const ArtCollectiblesTableHeader = document.getElementById("ArtCollectibles-table-header");
    const addArtCollectible = document.getElementById("add-ArtCollectible");
    const editArtCollectible = document.getElementById("edit-ArtCollectible");
    const title = document.getElementById("title");
    const image = document.getElementById("image");
    const paintingType = document.getElementById("painting-type");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const freeShipping= document.getElementById("free-shipping");
    const inventory= document.getElementById("inventory");
    const addingArtCollectible = document.getElementById("adding-ArtCollectible");
    const ArtCollectiblesMessage = document.getElementById("ArtCollectibles-message");
    const editCancel = document.getElementById("edit-cancel")
    const editForm = document.getElementById("edit-form")
    const editImage = document.getElementById("image-edit")
    const AdminDiv = document.getElementById("Admin-div");
    const AdminTable = document.getElementById("Admin-table")
    const AdminTableHeader =document.getElementById('Admin-table-header')
    const adminMessage = document.getElementById("Admin-message")
    const ArtCtitle = document.getElementById("ArtCollectible-table-title")
    const AdminTabletitle = document.getElementById("Admin-table-title")
    const Adminlogon = document.getElementById("Admin-logon-div")
    const AdminlogonButton = document.getElementById("Admin-logon-button")
    const AdminlogonCancel = document.getElementById("Admin-logon-cancel")
    const Adminemail = document.getElementById("Admin-email");
    const Adminpassword = document.getElementById("Admin-password");
  
  
    // section 2 

  

    let showing = logonRegister;
  let token = null;
  document.addEventListener("load" , async()=>{
    
      showing = logonRegister;   

      const count = await buildAllArtCollectiblesTable(
        ArtCollectiblesTable,
        ArtCollectiblesTableHeader,
        message
      );
     //1. return //this is an expriment
      if (count > 0) {
        ArtCollectiblesMessage.textContent = "";
        ArtCollectiblesTable.style.display = "block";
      } else {
        ArtCollectiblesMessage.textContent = "There are no ArtCollectibles to display for this user.";
        ArtCollectiblesTable.style.display = "none";
      }
     //2. return //this is an expriment
     ArtCollectibles.style.display = "block";
   
      showing = ArtCollectibles; 
      addArtCollectible.style.display = "none";
     

  });

 
  var suspendInput = false;

  
  document.addEventListener("startDisplay", async (e) => {
    //showing = logonRegister;
    token = localStorage.getItem("token");
    role = localStorage.getItem("role")
    console.log("here is role and token", token ,role)
    
    if (token) {
      logoff.style.display = "block";
      
      if (localStorage.role === artist){
        console.log("roleee", localStorage.role)
      //if the user is logged in
      logoff.style.display = "block";
      logonRegister.style.display = "none"
      addArtCollectible.style.display ="block"
      adminMessage.style.display="none"
      Adminlogon.style.display="none";
      
      const count = await buildArtCollectiblesTable(
        ArtCollectiblesTable,
        ArtCollectiblesTableHeader,
        token,
        message
      );
      if (count > 0) {
        ArtCollectiblesMessage.textContent = "";
        ArtCollectiblesTable.style.display = "block";
      } else {
        ArtCollectiblesMessage.textContent = "There are no ArtCollectibles to display for this user.";
        ArtCollectiblesTable.style.display = "none";
      }
      ArtCollectibles.style.display = "block";
      showing = ArtCollectibles;
      ArtCtitle.style.display="block";
      //ArtCollectibles.style.display= "10px 30px 100px 20px";
    } 
     if (localStorage.role === admin){
      logoff.style.display = "block";
      Adminlogon.style.display="none"
     
      const count = await buildAdminTable(AdminTable, AdminTableHeader,token,message)
     
      if (count > 0) {
        message.textContent = `Logon successful.  Welcome ${data.user.name}`;
        AdminTable.style.display = "block"
      } else {
        ArtCollectiblesMessage.textContent = "There are no user to display for this user.";
        ArtCollectiblesTable.style.display = "none";
      }
      
      AdminDiv.style.display = "block";
      showing = AdminDiv;
      ArtCtitle.style.display="block"
      ArtCtitle.textContent= "Users"
      adminMessage.style.display="none"
    }
  
  }
    else {
      

      logonRegister.style.display = "block";
      var thisEvent = new Event("load");
      document.dispatchEvent(thisEvent);
       suspendInput = false;
    }
  });

  var thisEvent = new Event("startDisplay");
  document.dispatchEvent(thisEvent);
  suspendInput = false;

  // section 3
  document.addEventListener("click", async (e) => {

    if (suspendInput) {
      if(e.target===logon){
           logonRegister.style.display = "none" ;  

      }
      return; // we don't want to act on buttons while doing async operations
    }
    if (e.target.nodeName === "BUTTON") {
      message.textContent = "";
    }
    if (e.target === logoff) {
      localStorage.removeItem("token");
      token = null;
      showing.style.display = "none";
      logoff.style.display = "none";
      logonRegister.style.display = "block";
      ArtCtitle.style.display= "block"
      ArtCtitle.textContent="ArtCollectibles";
      Adminlogon.style.display="none"
      showing = logonRegister;
      ArtCollectiblesTable.replaceChildren(ArtCollectiblesTableHeader); // don't want other users to see
      message.textContent = "You are logged off.";
      thisEvent = new Event("load");
      document.dispatchEvent(thisEvent);

    } else if (e.target === logon) {
      //console.log('at line 197')
      showing.style.display = "none";
      logonDiv.style.display = "block";
      showing = logonDiv;
    } else if (e.target === register) {   
      showing.style.display = "none";
      registerDiv.style.display = "block";
      showing = registerDiv;
    } else if (e.target === logonCancel || e.target == registerCancel) {
      showing.style.display = "none";
      Adminlogon.style.display= "none";
      adminMessage.style.display="none"
      ArtCtitle.style.display="block"
      logonRegister.style.display = "block";
      showing = logonRegister;
      email.value = "";
      password.value = "";
      name.value = "";
      email1.value = "";
      password1.value = "";
      password2.value = "";
      role.value = "";
      thisEvent = new Event("load");
      document.dispatchEvent(thisEvent);
    } else if (e.target === logonButton) {
      suspendInput = true;
      try {
        const response = await fetch("/api/v1/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        const data = await response.json();
        if (response.status === 200) {
          message.textContent = `Logon successful.  Welcome ${data.user.name}`;
          const token = data.token;
          const role = data.user.role
          //console.log("hey role",role)
          localStorage.setItem("token", token);
          localStorage.setItem("role", role)
         
          showing.style.display = "none";
          thisEvent = new Event("startDisplay");
          email.value = "";
          password.value = "";
          document.dispatchEvent(thisEvent);
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        message.textContent = "A communications error occurred.";
      }
      suspendInput = false;
    } else if (e.target === registerButton) {
      if (password1.value != password2.value) {
        message.textContent = "The passwords entered do not match.";
      } else {
        suspendInput = true;
        try {
          const response = await fetch("/api/v1/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name.value,
              email: email1.value,
              password: password1.value,
              role:role.value,
            }),
          });
          const data = await response.json();
          if (response.status === 201) {
            message.textContent = `Registration successful.  Welcome ${data.user.name}`;
            token = data.token;
            localStorage.setItem("token", token);
            showing.style.display = "none";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
            name.value = "";
            email1.value = "";
            password1.value = "";
            password2.value = "";
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          message.textContent = "A communications error occurred.";
        }
        suspendInput = false;
      }
    } 
    // section 4
    //console.log('line 364');
    else if (e.target === addArtCollectible) {
    //  console.log('line 366')
        showing.style.display = "none";
        editArtCollectible.style.display = "block";
        showing = editArtCollectible;
        delete editArtCollectible.dataset.id; 
        image.value = "";  
        title.value = "";
        paintingType.value="Oil";
        price.value = "";
        description.value = "";
        freeShipping.value = "";
        inventory.value ="";
        addingArtCollectible.textContent = "add";
      } else if (e.target === editCancel) {
        showing.style.display = "none";
        image.value = "";
        title.value = "";
        paintingType.value ="Oil";
        price.value = "";
        description.value = "";
        freeShipping.value = "No";
        inventory.value = "";
        thisEvent = new Event("startDisplay");
        document.dispatchEvent(thisEvent);
      } else if (e.target === addingArtCollectible) {
  
        if (!editArtCollectible.dataset.id) {     // If editJob.dataset.id is not set, then this is an add. If it is set, it holds the value of the entry being edited.
          // this is an add attempt
          suspendInput = true;
          try {
            const response = await fetch("/api/v1/ArtCollectibles", {
              method: "POST",
              headers: {
                //"Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },

              body: new FormData(editForm)  //insted of putting each form input separetly we put it like this!
            });
            //console.log(response)
            const data = await response.json();
            console.log(data)
            if (response.status === 201) {
              //successful create
              message.textContent = "The ArtCollectible entry was created.";
              showing.style.display = "none";
              thisEvent = new Event("startDisplay");
              document.dispatchEvent(thisEvent);
              image.value = "";
              title.value = "";
              paintingType.value ="Oil";
              price.value = "";
              description.value = "";
              freeShipping.value = "No";
              inventory.value = ""
            } else {
              // failure
              message.textContent = data.msg;
              console.log(data.message)
            }
          } catch (err) {
            console.log(err)
            message.textContent = "A communication error occurred.";
          }
          suspendInput = false;
        } else {
          // this is an update
          suspendInput = true;
          try {
            const ArtCollectibleID = editArtCollectible.dataset.id;

            const response = await fetch(`/api/v1/ArtCollectibles/${ArtCollectibleID}`, {
              method: "PATCH",
              headers: {
               // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              
              body: new FormData(editForm)
              
            });
            const data = await response.json();
           //console.log('data', data)
          
            if (response.status === 200) {
              message.textContent = "The entry was updated.";
              showing.style.display = "none";
              image.value = "";
              title.value = "";      ///??? why we show these fields equal to empty again?
              paintingType.value = "Oil";
              price.value = "";
              description.value = "";
              freeShipping.value = "No";
              inventory.value ="";
              thisEvent = new Event("startDisplay");
              document.dispatchEvent(thisEvent);
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            console.log(err)
            message.textContent = "A communication error occurred.";
          }
        }
        suspendInput = false;
      } 
      // section 5

      else if (e.target.classList.contains("editButton")) {
        editArtCollectible.dataset.id = e.target.dataset.id;
        suspendInput = true;
        try {
          console.log('datasetID', e.target.dataset.id)
          const response = await fetch(`/api/v1/ArtCollectibles/${e.target.dataset.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          //console.log("responce", response) 
          const data = await response.json();
          if (response.status === 200) {
            if(data.imageURL){
              putImage(editImage, data.imageURL, token)
            
            }else{
              editImage.textContent = "no image";
            }
            image.value = "";
            title.value = data.title;
            price.value = data.price;
            paintingType.value = data.paintingType;
            description.value = data.description;
            freeShipping.value = data.freeShipping;
            inventory.value = data.inventory;
            showing.style.display = "none";   
            showing = editArtCollectible;
            showing.style.display = "block";
           // editImage.style.display ="block"
            addingArtCollectible.textContent = "update";
            message.textContent = "";
          } else {
            // might happen if the list has been updated since last display
            message.textContent = "The ArtCollectibles entry was not found";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          }
        } catch (err) {
          console.log(err)
          message.textContent = "A communications error has occurred.";
        }
        suspendInput = false;
      }
      else if ( e.target.classList.contains('deleteButton')){
        editArtCollectible.dataset.id = e.target.dataset.id
        suspendInput = true;

        try{
           const response = await fetch(`/api/v1/ArtCollectibles/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

       // const data = await response.json();
          if (response.status === 200) {
        
            message.textContent = "Our new ArtCollectible table.";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          } 
        } catch (err) {
          message.textContent = "A communications error has occurred.";
        }
        suspendInput = false;
      }

      
       else if(e.target === adminButton ){
        showing.style.display = "none";
        adminMessage.style.display ="block";
        Adminlogon.style.display = "block";
        showing = logonDiv;
        logonRegister.style.display ="none";
        ArtCtitle.style.display= "none"
        console.log('line 608')
       }
         else if (e.target === AdminlogonButton) {
          console.log('line 611')
          suspendInput = true;
          try {
            const response = await fetch("/api/v1/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: Adminemail.value,
                password: Adminpassword.value,
              }),
            });
           // console.log(response)
            const data = await response.json();
           // console.log(data)
            if (response.status === 200) {
              message.textContent = `Logon successful.  Welcome ${data.user.name}`;
              const token = data.token;
              const role = data.user.role
              localStorage.setItem("token", token);
              localStorage.setItem("role", role);
              showing.style.display = "none";
              thisEvent = new Event("startDisplay");
              Adminemail.value = "";
              Adminpassword.value = "";
              document.dispatchEvent(thisEvent);
              
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            console.log(err)
            message.textContent = "A communications error occurred.";
          }
          suspendInput = false;
       
      } else if ( e.target.classList.contains('AdmindeleteButton')){
        AdminTable.dataset.id = e.target.dataset.id
        suspendInput = true;

        try{
           const response = await fetch(`/api/v1/Admin/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

       // const data = await response.json();
          if (response.status === 200) {
        
            message.textContent = "User deleted!";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          } 
        } catch (err) {
          message.textContent = "A communications error has occurred.";
        }
        suspendInput = false;
      }
     
       
  })
  });