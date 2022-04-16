/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
function reset(event){

    for(let i in userAnswers)
    {
        delete userAnswers[i];
    }


    for(const box of boxes){
        box.addEventListener('click', Checked);
        box.classList.remove('unselected');
        box.querySelector('.checkbox').src = "./images/unchecked.png";
        box.classList.remove('selected');
        box.style.backgroundColor="#f4f4f4";
    }

    let result = document.querySelector('.result');
    result.classList.add("hidden");

    let button = event.currentTarget;
    button.removeEventListener("click", reset);

}



function result(){

    let choiceId=userAnswers['one'];
    if(userAnswers.one === userAnswers.two || userAnswers.one === userAnswers.three)
        choiceId=userAnswers['one'];
    if(userAnswers.two === userAnswers.one || userAnswers.two === userAnswers.three)
        choiceId=userAnswers['two'];
    if(userAnswers.three === userAnswers.one || userAnswers.three === userAnswers.two)
        choiceId=userAnswers['three'];

        let titolo = document.querySelector('.result h1');
        let contenuto = document.querySelector('.result p');

        titolo.textContent = RESULTS_MAP[choiceId].title;
        contenuto.textContent = RESULTS_MAP[choiceId].contents;
    
        let result = document.querySelector('.result');
        result.classList.remove("hidden");
    
        let button = document.querySelector('.result button');
        button.addEventListener("click", reset);
}



function userLength(){
    let conta = 0;
    for( k in userAnswers)
        conta++;
    return conta;
}


function fullControl(){
    let lunghezza=userLength();

    if (lunghezza==3)
    {
        for (let i = 0; i<boxes.length; i++){
            boxes[i].removeEventListener('click', Checked);
        }

        result();
                
    }
    
}







function InEvidence(event){
    //lista di tutti i div della section choice-grid
    let allDivs = document.querySelectorAll('.choice-grid div')
    for(let i=0; i<allDivs.length; i++)
    {
        if(event.dataset.questionId==allDivs[i].dataset.questionId)
        {
            //si elimina la classe opaco dall'elemento qualora fosse stato scelto in precedenza
            allDivs[i].classList.remove("unselected");
            //si porta alla condizione di non selezione originale
                if(allDivs[i].querySelector('.checkbox').src="./images/checked.png")
                {
                    allDivs[i].querySelector('.checkbox').src="./images/unchecked.png";
                    allDivs[i].style.backgroundColor="#f4f4f4";
                }
        }
        
    }

    
}




function Checked(event)
{

    userAnswers[event.currentTarget.dataset.questionId] = event.currentTarget.dataset.choiceId;

    InEvidence(event.currentTarget);
    
    event.currentTarget.style.backgroundColor="#cfe3ff";
    let checkbox = event.currentTarget.querySelector('.checkbox');
    checkbox.src="./images/checked.png";
   
    for (let i = 0; i<boxes.length; i++)
    {
        if(boxes[i]!=event.currentTarget &&  event.currentTarget.dataset.questionId==boxes[i].dataset.questionId){
            boxes[i].classList.add("unselected");
        }      
    }

    fullControl();
    
}

let userAnswers = {};//dizionario per memorizzare risposte fornite dall' utente

const boxes = document.querySelectorAll('.choice-grid div');
for(let box of boxes)
{
    box.addEventListener('click',Checked);
}

