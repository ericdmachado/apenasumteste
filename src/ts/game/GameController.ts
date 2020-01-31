import Spaceship from "./Spaceship";
import Score from "./Score";
import Starfield from "./Starfield";
import KeyboardListener from "./KeyboardListener";

export default class GameController{
    
    private state;
    
    constructor(){
        let spaceship = new Spaceship();
        let score = new Score();
        let starfield = new Starfield();
        let keyboardListener = new KeyboardListener();


        keyboardListener.subscribe(spaceship.move);
    }

    load(){
        console.info('LOAD');
    }
}
