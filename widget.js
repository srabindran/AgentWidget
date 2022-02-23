//A function that queries for movie 
function searchTitle() { 

    const t = document.getElementById('t');
    const y = document.getElementById('y');
    const form = document.getElementById('search-by-title-form');
    const errorTxt = document.getElementById('error');
    const plot = document.getElementById('plot');
    const response =  document.getElementById('search-by-title-response');
    fetch('https://omdbapi.com/?i=tt3896198&apikey=cca1b381&t='+t.value+"&y="+y+"&plot="+plot)
    .then(res => res.json())
    .then((out) => {
        console.log('Output: ', out);
        response.innerText = 'Response: '+JSON.stringify(out);
       
    }).catch(err => errorTxt.innerText = err);
   

}

function resetValues(){
    
    const form = document.getElementById('search-by-title-form').reset();
    
    

}

function searchLastMessage(){

    const errorTxt = document.getElementById('error');
    const response =  document.getElementById('search-by-msg-response');
    const searchString = document.getElementById('search-by-msg-string');
    const customerMessages = [];
    var t ="";
    lpTag.agentSDK.init();
    
    var updateCallback = function(data) {
      var value = data.newValue;
      value.forEach( elem => {
        if(elem.source == 'visitor') {
          customerMessages.push(elem.text);
        }
      });
      //console.log("customer messages: ",customerMessages);
    };

    var notifyWhenDone = function(err) {
      if (err) {
        errorTxt.innerText = err;
        notify.setAlertMessageRed("Error: " + err);
      }
      //console.log("Bind Done");
      notify.setAlertMessageRed("Data updated");
      notify.removeAlertMsg();
    };

      var pathToData = "chatTranscript.lines";
      lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);
      setTimeout(function () {
        // do what you want
            searchString.innerText = "Search String: "+ customerMessages[customerMessages.length - 1];
            t = customerMessages[customerMessages.length - 1];
            fetch('https://omdbapi.com/?i=tt3896198&apikey=cca1b381&t='+t)
             .then(res => res.json())
                .then((out) => {
                    //console.log('Output: ', out);
                    response.innerText = 'Search by Message Response: '+JSON.stringify(out);
                
                }).catch(err => errorTxt.innerText = err);
            
      }, 6000);
      //Searching for movie title
      console.log("https://omdbapi.com/?i=tt3896198&apikey=cca1b381&t="+t);


    
}