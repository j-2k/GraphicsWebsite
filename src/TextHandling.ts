
function AboutButtonHandler()
{
    let isShowingBio:boolean = true;
    const exploreText = document.getElementById("clickable-text")as HTMLElement;
    const hiddenText = document.getElementById("hidden-text") as HTMLElement;
    const aboutStr:string = "Hi there! I'm Juma Al Remeithi, a developer that specializes on Games, Websites, & Graphics. I have been playing games for a very long time (over 10k hours in-game time) & decided to make it my passion. My dream is to work in anything graphics related such as Shaders, Graphics Specializations, Rendering Topics, & etc. This is essentially my biggest dream to work & specialize in the graphics space. Check out my github by clicking the github logo at the top if you're interested in my on-going projects!";
    
      exploreText.addEventListener("click", function() {
        if(isShowingBio)
        {
          fadeOutInText(aboutStr,hiddenText);
        }
        else
        {
          fadeOutText(aboutStr,hiddenText);
        }
        isShowingBio = !isShowingBio;
    });
    
    function fadeOutInText(newText:string,textParam:HTMLElement): void {
      textParam.style.opacity = "0";
      setTimeout(function() {
        textParam.textContent = newText;
        textParam.style.opacity = "1";
      }, 200);
    }
    
    function fadeOutText(newText:string,textParam:HTMLElement): void {
      textParam.style.opacity = "1";
      setTimeout(function() {
        textParam.textContent = newText;
        textParam.style.opacity = "0";
      }, 200);
    }
}


export {
    AboutButtonHandler
}