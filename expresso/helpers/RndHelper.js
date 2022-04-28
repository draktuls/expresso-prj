var fs = require('fs');
var hbs = require('handlebars');

module.exports = {
    getBullshit(){
        const bullshittery = [
            "<h3>Wow this is amazing page 10/10</h3>",
            "<h3>What a great author!</h3>",
            "<h3>Help me I am being kept as a slave and I have to write javascript! ITS A TORTURE</h3>",
            "<h3>Is this the best page ever or what?</h3>",
            "<h3>The page was written whilst listening to Eminem</h3>",
            "<h3>Honestly I can't stop listening to this <a href=\"https://www.youtube.com/watch?v=SW-BU6keEUw\">banger</a></h3>",
            "<div class=\"bg-alert\">Creeper<br>Aw man<br><br>So we back in the mine<br>Got our pickaxe swinging from side to side<br>Side-side to side<br>This task, a grueling one<br>Hope to find some diamonds tonight, night, night<br>Diamonds tonight<br><br>Heads up<br>You hear a sound, turn around and look up<br>Total shock fills your body<br>Oh no, it's you again<br>I can never forget those eyes, eyes, eyes<br>Eyes-eyes-eyes<br><br>'Cause, baby, tonight<br>The creeper's trying to steal all our stuff again<br>'Cause, baby, tonight<br>Grab your pick, shovel, and bolt again (Bolt again-gain)<br>And run, run until it's done, done<br>Until the sun comes up in the morn'<br>'Cause, baby, tonight<br>The creeper's trying to steal all our stuff again (Stuff again-gain)<br><br>Just when you think you're safe<br>Overhear some hissing from right behind<br>Right-right behind<br>That's a nice life you have<br>Shame it's gotta end at this time, time, time<br>Time-time-time-time<br><br>Blows up<br>Then your health bar drops and you could use a one-up<br>Get inside, don't be tardy<br>So now you're stuck in there<br>Half a heart is left, but don't die, die, die<br>Die-die-die<br><br>'Cause, baby, tonight<br>The creeper's trying to steal all our stuff again<br>'Cause, baby, tonight<br>Grab your pick, shovel, and bolt again (Bolt again-gain)<br>And run, run until it's done, done<br>Until the sun comes up in the morn'<br>'Cause, baby, tonight<br>The creeper's trying to steal all our stuff again<br><br>Creepers, you're mine, haha<br>Dig up diamonds,<br>And craft those diamonds,<br>And make some armor,<br>Get it, baby, go and forge that like you so MLG pro<br>The sword's made of diamonds, so come at me bro<br>Huh? Training in your room under the torchlight<br>Hone that form to get you ready for the big fight<br>Every single day and the whole night<br>Creeper's out prowlin', woo, alright<br>Look at me, look at you<br>Take my revenge, that's what I'm gonna do<br>I'm a warrior, baby, what else is new?<br>And my blade's gonna tear through you, bring it<br><br>'Cause, baby, tonight<br>The creeper's trying to steal all our stuff again<br>(Gather your stuff, yeah, let's take back the world, haha)<br>Yeah, baby, tonight grab your sword, armor and go (It's on)<br>Take your revenge (Woo), oh-oh-oh-oh<br>So fight, fight, like it's the last, last night of your life, life<br>Show them your bite (Woo)<br><br>'Cause, baby, tonight<br>The creeper's trying to steal all our stuff again<br>'Cause, baby, tonight<br>Grab your pick, shovel and bolt again (Bolt again-gain, woo)<br>And run, run until it's done, done<br>Until the sun comes up in the morn'<br>'Cause, baby, tonight (Come on, swing your sword up high)<br>The creeper's trying to steal all our stuff again (Come on, jab your sword down low)<br>(Woo)</div>",
            "<h3>Amazing job - next gen website</h3>",
            "<video width=\"640\" height=\"480\" controls><source src=\"vid/aaaa.mp4\" type=\"video/mp4\">Your browser does not support the video tag.</video>",
            "<img style=\"width: 600px;height: 400px;\" src=\"images/sfw.png\" alt=\"Oooops ..\">",
            "<img style=\"width: 600px;height: 400px;\" src=\"images/why.webp\" alt=\"Oooops ..\">",
            "<img style=\"width: 600px;height: 400px;\" src=\"images/understand.png\" alt=\"Oooops ..\">",
            "<h1>This is the future!</h1>",
            "<h3>What do you call a pig that does karate?</h3><br><h1>A pork chop</h1>",
            "<h3>What did one butt cheek say to the other?</h3><br><h1>Together, we can stop this crap.</h1>",
            "<img style=\"width: 600px;height: 400px;\" src=\"images/what.png\" alt=\"Oooops ..\">"

        ]
        
        return bullshittery[Math.floor(Math.random()*bullshittery.length)];
    }
}