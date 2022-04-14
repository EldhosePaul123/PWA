/*
test commit
*/
    if ("serviceWorker" in navigator) {
         navigator.serviceWorker.register("../sw.js").then(registration=>{
            console.log("SW Registered2");
            console.log(registration);

        }).catch(error=>{
            console.error("SW Registration failed");
            console.error(error);
        });
    }
       
     

