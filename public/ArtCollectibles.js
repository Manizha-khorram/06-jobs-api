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
            let editButton = `<td><button type="button" class="editButton" data-id=${data.ArtCollectibles[i]._id}>edit</button></td>`;
            let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.ArtCollectibles[i]._id}>delete</button></td>`;
            let rowHTML = `<td>${data.ArtCollectibles[i].artist}</td><td>${data.ArtCollectibles[i].title}</td><td>${data.ArtCollectibles[i].paintingType}</td><td>${data.ArtCollectibles[i].price}</td><td>${data.ArtCollectibles[i].description}</td><td>${data.ArtCollectibles[i].freeShipping}</td><td>${data.ArtCollectibles[i].inventory}</td>${editButton}${deleteButton}`;
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
      message.textContent = "A communication error occurred.";
      return 0;
    }
  }

  //here
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
            let cartButton = `<td><button type="button" class="Cart" data-id=${data.ArtCollectibles[i]._id}>Add to Cart</button></td>`;
            let orderButton = `<td><button type="button" class="order" data-id=${data.ArtCollectibles[i]._id}>Process Order</button></td>`;
            let rowHTML = `<td>${data.ArtCollectibles[i].artist}</td><td>${data.ArtCollectibles[i].title}</td><td>${data.ArtCollectibles[i].paintingType}</td><td>${data.ArtCollectibles[i].price}</td><td>${data.ArtCollectibles[i].description}</td><td>${data.ArtCollectibles[i].freeShipping}</td><td>${data.ArtCollectibles[i].inventory}</td>${cartButton}${orderButton}`;
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
      message.textContent = "A communication error occurred.";
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
    const role = document.getElementById("role")
    const registerButton = document.getElementById("register-button");
    const registerCancel = document.getElementById("register-cancel");
    const ArtCollectibles = document.getElementById("ArtCollectibles");
    const ArtCollectiblesTable = document.getElementById("ArtCollectibles-table");
    const ArtCollectiblesTableHeader = document.getElementById("ArtCollectibles-table-header");
    const addArtCollectible = document.getElementById("add-ArtCollectible");
    const editArtCollectible = document.getElementById("edit-ArtCollectible");
    const title = document.getElementById("title");
    const paintingType = document.getElementById("painting-type");
    const price = document.getElementById("price");
    const description = document.getElementById("description");
    const freeShipping= document.getElementById("free-shipping");
    const inventory= document.getElementById("inventory");
    const addingArtCollectible = document.getElementById("adding-ArtCollectible");
    const ArtCollectiblesMessage = document.getElementById("ArtCollectibles-message");
    const editCancel = document.getElementById("edit-cancel");
  
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
     ArtCollectibles.style.margin = "-71px 30px 100px 20px";
      showing = ArtCollectibles; 
      addArtCollectible.style.display = "none";
      //Carts
     if (e.target.classList.contains("Cart")){
       
      try {
        const response = await fetch("/api/v1/carts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        let data = await response.json();
      
      }catch(err){
        message.textContent = "A communications error occurred.";
      }
    }

  });

 
  var suspendInput = false;

  
  document.addEventListener("startDisplay", async (e) => {
    //showing = logonRegister;
    token = localStorage.getItem("token");
    if (token) {
      //if the user is logged in
      logoff.style.display = "block";
      logonRegister.style.display = "none"
      addArtCollectible.style.display ="block"
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
      //ArtCollectibles.style.display= "10px 30px 100px 20px";
    } else {
      

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
      showing = logonRegister;
      ArtCollectiblesTable.replaceChildren(ArtCollectiblesTableHeader); // don't want other users to see
      message.textContent = "You are logged off.";
      thisEvent = new Event("load");
      document.dispatchEvent(thisEvent);

    } else if (e.target === logon) {
      console.log('at line 197')
      showing.style.display = "none";
      logonDiv.style.display = "block";
      showing = logonDiv;
    } else if (e.target === register) {    // why we didnt check register before logon??!
      showing.style.display = "none";
      registerDiv.style.display = "block";
      showing = registerDiv;
    } else if (e.target === logonCancel || e.target == registerCancel) {
      showing.style.display = "none";
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
          token = data.token;
          localStorage.setItem("token", token);
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
    else if (e.target === addArtCollectible) {
        showing.style.display = "none";
        editArtCollectible.style.display = "block";
        showing = editArtCollectible;
        delete editArtCollectible.dataset.id;   ///???
        title.value = "";
        paintingType.value="Oil";
        price.value = "";
        description.value = "";
        freeShipping.value = "";
        inventory.value ="";
        addingArtCollectible.textContent = "add";
      } else if (e.target === editCancel) {
        showing.style.display = "none";
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
          // this is an attempted add 
          suspendInput = true;
          try {
            const response = await fetch("/api/v1/ArtCollectibles", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                title:  title.value,
                paintingType : paintingType.value,
                price :price.value,
                description : description.value,
                freeShipping:  freeShipping.value, 
                inventory: inventory.value,
              }),
            });
            const data = await response.json();
            if (response.status === 201) {
              //successful create
              message.textContent = "The ArtCollectible entry was created.";
              showing.style.display = "none";
              thisEvent = new Event("startDisplay");
              document.dispatchEvent(thisEvent);
              title.value = "";
              paintingType.value ="Oil";
              price.value = "";
              description.value = "";
              freeShipping.value = "No";
              inventory.value = ""
            } else {
              // failure
              message.textContent = data.msg;
            }
          } catch (err) {
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
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                title:  title.value,
                paintingType : paintingType.value,
                price :price.value,
                description : description.value,
                freeShipping:  freeShipping.value, 
                inventory: inventory.value,
              }),
            });
            const data = await response.json();
            if (response.status === 200) {
              message.textContent = "The entry was updated.";
              showing.style.display = "none";
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
          const response = await fetch(`/api/v1/ArtCollectibles/${e.target.dataset.id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          if (response.status === 200) {
            title.value = data.artCollectible.title;
            price.value = data.artCollectible.price;
            paintingType.value = data.artCollectible.paintingType;
            description.value = data.artCollectible.description;
            freeShipping.value = data.artCollectible.freeShipping;
            inventory.value = data.artCollectible.inventory;
            showing.style.display = "none";   //?? which display we make equal to none??
            showing = editArtCollectible;
            showing.style.display = "block";
            addingArtCollectible.textContent = "update";
            message.textContent = "";
          } else {
            // might happen if the list has been updated since last display
            message.textContent = "The ArtCollectibles entry was not found";
            thisEvent = new Event("startDisplay");
            document.dispatchEvent(thisEvent);
          }
        } catch (err) {
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
      

  })
  });