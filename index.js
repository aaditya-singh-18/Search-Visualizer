let array = []
function generateArray(size = 10){
    array = Array.from({length : size} ,() => Math.floor(Math.random() * 90) + 10 )
    display()
}

function display(){
    const container = document.getElementById("array");
    container.innerHTML = "";
    array.forEach(value =>{
        const bar = document.createElement('div')
        bar.classList.add('bar')
        bar.style.height = `${value * 3}px`;
        bar.textContent = value;
        container.appendChild(bar)        
    })
}

function sortArray(){
    array.sort((a,b) => a-b);
    display()
}

async function linearSearch(target){
    const bars = document.querySelectorAll('.bar');
    for(let i = 0; i < array.length; i++){
        bars[i].style.background = 'orange';
        await new Promise(resolve => setTimeout(resolve, 500))

        if(array[i] === target){
            bars[i].style.backgroundColor = 'green';
            console.log('found' , target)
            return;
        }
        else{
            bars[i].style.backgroundColor = 'red';
        }
    }
}

async function binarySearch(target){
    let left = 0;
    let right = array.length-1;
    const bar = document.querySelectorAll('.bar');

    while(left <= right){
        let mid = Math.floor((left+right)/2);
        bar[mid].style.background = 'orange';

        await new Promise(resolve => setTimeout(resolve , 500));

        if(array[mid] === target){
            bar[mid].style.backgroundColor = 'green';       
            return;
        }
        if(array[mid] < target){
            for(let i = left; i <= mid; i++){
                bar[i].style.backgroundColor = 'gray';
            }
            left = mid + 1;
        }
        else{
            for(let i = mid; i <= right; i++){
                bar[i].style.backgroundColor = 'gray';
            }
            right = mid - 1;
        }
    }
    for (let i = 0; i < bar.length; i++) {
        if (bar[i].style.backgroundColor !== 'green') {
            bar[i].style.backgroundColor = 'red';
        }
    }
}


document.getElementById('generate').addEventListener("click" , ()=> generateArray());
document.getElementById('sort').addEventListener("click" , ()=> sortArray());

document.getElementById('linear').addEventListener("click" , () =>{
    const target = document.getElementById("target").value;
    if(target) {
        linearSearch(Number(target));
    }
})

document.getElementById('binary').addEventListener("click" , () =>{
    const target = document.getElementById("target").value;
    if(target) {
        binarySearch(Number(target));
    }
})