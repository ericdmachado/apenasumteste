export default class KeyboardListener
{
    private state:any;

    constructor(){
        this.state = { observers: [] }
        document.addEventListener('keydown', this.handleKeydown.bind(this));
    }

    subscribe( observerFunction:Function ){
        this.state.observers.push( observerFunction );
    }

    private handleKeydown( event:KeyboardEvent ){
        const keyPressed = event.key;
        const command = {
            playerId: 'player1',
            keyPressed
        };
        
        this.notifyAll( command );
    }

    private notifyAll( command:Object ){
        console.log(`Notifying ${this.state.observers.length} observers`);

        for(const observerFunction of this.state.observers){
            observerFunction(command);
        }
    }
}