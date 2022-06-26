const search=document.getElementById('search');
const matchList=document.getElementById('match-list');
//search states.json and filter it
const searchStates=async searchText=>{
const res=await fetch('info.json');
const stas=await res.json();
// console.log(states);//outputs all states 
//get matches to current text inputs
let matches=stas.filter((state)=>{
    const regex=new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex)||state.code.match(regex);
    // console.log(state);
});
if(searchText.length==0){
    matches=[];
}
// console.log(matches);
outputHtml(matches);
}
//show results in html
const outputHtml=matches=>{
    if(matches.length>0){
        const html=matches.map(match=>`
        <div class="card">
            <h4><span class="hi">${match.name}(${match.code})</span>
            <span class="tct">${match.capital}</span></h4>
            <small>Lat: ${match.coordinates[0]} / Long: ${match.coordinates[1]}</small>
        </div>
        `).join('');
        // console.log(html);
        matchList.innerHTML=html;
    }
}
search.addEventListener('input', ()=>searchStates(search.value));
