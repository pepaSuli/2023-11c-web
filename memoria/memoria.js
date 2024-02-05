/*memória
képpárok
nehézségi szintek (vicces névvel)
"Mester" játék
Leaderboard (Toplista)
Reszponzív felépítés (telefonra is jó legyen!)


Működése:
- minden kép lefordítva
- 1 kép felfordul
- mégegy kép felfordul
- ha egyezik, úgy marad, ha nem visszafordul
- vége, ha minden kép felfordulva
- időmérés! Aktuális idő(most) - kezdőidő

*/

var kepekUrl=["aintNobdyGotTimeForThat.png","aliens.png","andItsGone.png","awkwardMomentSealion.png","backInMyDays.png","badLuckBrian.png","confessionBear.png","dawg.png","doge.png","drEvil.png","facePalmPickard.png","notSure.png","oneDoesNotSimply.png","philosoraptor.png","sayThatAgain.png","soHot.png","stonerStanley.png","tooDamnHigh.png","yallGotAny.png","yUNo.png"];
var parDb=4;


function init()
{
	//console.log("hahó");
	kepKirakas();
}
var kattintas=0;
function kepKirakas()
{
	let asztal=document.getElementById("asztal");

	let kartyak=[]

	for(let k=0;k<2;k++)
	{
		for(let i=0;i<parDb;i++)
		{
			let uj=document.createElement("div"); //<div></div>
			uj.className="kartya"; //<div class="kartya"></div>
			uj.onclick=function(){
				//csak kettő kártya lehet felfordítva
				if(kattintas<2)
				{
					uj.style.backgroundImage="url(kepek/" + kepekUrl[i]+")";
					uj.dataset.felforditva="true";
				}

				kattintas++;

				if(kattintas===2)
				{
					setTimeout(visszaFordit,2000);
				}

			};
			//asztal.appendChild(uj);
			kartyak.push(uj)		
		}
	}
	kartyak=kever(kartyak);

	for(let i=0;i<kartyak.length;i++)
	{
		asztal.appendChild(kartyak[i]);
	}
}

function visszaFordit()
{
	const lapok=document.getElementById("asztal").children;
	console.log(lapok);
	const aktiv=[];
	for(let i=0;i<lapok.length;i++)
	{
		if(lapok[i].dataset.felforditva==="true")
		{
			aktiv.push(lapok[i]);
		}
	}

	console.log(aktiv);
	if(aktiv[0].style.backgroundImage!==aktiv[1].style.backgroundImage)
	{
		aktiv[0].style.backgroundImage="";
		aktiv[1].style.backgroundImage="";
	}
	else
	{
		//párt találtunk
		aktiv[0].onclick="";
		aktiv[1].onclick="";
		if(!vanEMeg())
		{
			nyertel();
		}
	}

	aktiv[0].dataset.felforditva="";
	aktiv[1].dataset.felforditva="";

	kattintas=0;
}
	
function nyertel()
{
	let uj=document.createElement("div");
	uj.innerHTML="Game Over";

	document.getElementById("asztal").appendChild(uj);
}

function vanEMeg()
{
	const lapok=document.getElementById("asztal").children;

	let darab=0;
	for(let i=0;i<lapok.length;i++)
	{
		if(lapok[i].style.backgroundImage==="")
		{
			darab++;
		}
	}

	return darab>0;
}

function kever(points) {
  for (let i = points.length -1; i > 0; i--) {
	let j = Math.floor(Math.random() * (i+1));
	let k = points[i];
	points[i] = points[j];
	points[j] = k;
  }

  return points;
}