const search=document.getElementById('search');
const matchList=document.getElementById('match-list');
//search states.json and filter it
const searchStates=async searchText=>{
const res=await fetch('info.json');
const states=await res.json();
// console.log(states);//outputs all states 
//get matches to current text inputs
let matches=states.filter(state=>{
    const regex=new RegExp(`^${searchText}`, 'gi');
    return state.name.match(regex)||state.abbr.match(regex);
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
            <h4><span class="hi">${match.name}(${match.abbr})</span>
            <span class="tct">${match.capital}</span></h4>
            <small>Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `).join('');
        // console.log(html);
        matchList.innerHTML=html;
    }
}
search.addEventListener('input', ()=>searchStates(search.value));
