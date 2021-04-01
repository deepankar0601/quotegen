const quoteContainer= document.getElementById('quote-container');
const quote= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitter= document.getElementById('twitter');
const newQuote= document.getElementById('new-quote');
const loader=document.getElementById('loader');


function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

//Get quote
async function getQuote(){
    loading();
    const getUrl='https://type.fit/api/quotes/?method=getQuote&lang=en&format=json';
    try{
        const response= await fetch(getUrl);
        const data = await response.json();
        console.log(data);
        let number = Math.floor(Math.random() * data.length);
    
    //if author is blank, add 'Unknown;
    
    if (data[number].author === null) {
        quote.textContent = data[number].text;
      authorText.textContent = "Unknown";
    } else {
      authorText.textContent= data[number].author;
      quote.textContent = data[number].text;
    }
    if(data[number].text.length > 50){
        quote.classList.add('long-quote');
    }else{
        quote.classList.remove('long-quote')
    }
    complete();
    }
    catch(err){
      
        console.log(err);
    }
}

function tweet(){
    const quote1= quote.textContent;
    const author1= author.textContent;
    const twitterUrl= `https://twitter.com/intent/tweet?text=${quote1} - ${author1}`;
    window.open(twitterUrl,'_blank');
}

newQuote.addEventListener('click',getQuote);
twitter.addEventListener('click',tweet);
//on load

getQuote();