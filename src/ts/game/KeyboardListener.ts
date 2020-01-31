export default class KeyboardListener{

    private keycodes:Object;
    private state:any;

    constructor(){
        this.keycodes = {32:'Space', 87: 'Up', 83: 'Down'};
        this.state = {
            observers: []
        }

        document.addEventListener('keydown', this.handleKeydown);
    }

    subscribe( observerFunction:Function ){
        this.state.observers( observerFunction );
    }

    handleKeydown( event:KeyboardEvent ){
        const keyPressed = event.key;
        
        const command = {
            playerId: 'player1',
            keyPressed
        };
        
        this.notifyAll( command );
    }

    notifyAll( command:Object ){
        console.log(`Notifying ${this.state.observers.length} observers`);

        for(const observerFunction of this.state.observers){
            observerFunction(command);
        }
    }
}