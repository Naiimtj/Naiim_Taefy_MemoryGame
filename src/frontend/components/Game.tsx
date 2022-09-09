import { React } from "../../dep.ts"
import IPokemonCard from '../../models/pokemon_card.ts'

function Board ( { listOfPokemons }: { listOfPokemons: IPokemonCard[] }) {


// Número de Clicks (0-1-2)
    const [clickN, SetclickN] = React.useState(0)
    const crypto = globalThis.crypto;
    const board_cards = listOfPokemons.concat(listOfPokemons)
    board_cards.sort(() => Math.random() - 0.5)
    // Click Card
    function handleSubmit (namePoke: any) {
        // SetClicker 1 Card
        const [click1, SetClick1] = React.useState("")
        // SetClicker 2 Card
        const [click2, SetClick2] = React.useState("")

        React.useEffect(() => {   
            if (click1 === "") {
                SetClick1(namePoke)
            console.log("CLICK 1", namePoke);
            }
            if (click1 !== "" && click2 === "") {
                SetClick2(namePoke)
            console.log("CLICK 2", namePoke);
            } 

        }, [namePoke && namePoke !== ""]);
        const clickN1 = click1 !== "" ? 1 : 0;
        const clickN2 = click2 !== "" ? 1 : 0;
        const clickNT = clickN1 + clickN2;
       // SetclickN(clickNT)
    }
    // console.log(clickN);
    
    
    return (
        <div className="board">
        { board_cards.map( ({name, url_image}) =>
            <Card 
                key={crypto.randomUUID()} 
                name={name}
                url_image={url_image}
                onSubmit={handleSubmit}
            />
        )}
</div>
    )
}
export default Board

function Card (props:any) {
    const {name, url_image, onSubmit} = props;
    // Mostrar Imagen Seleccionada
    const [isSelected, setSelected] = React.useState(false)
    // Imagen de Fondo
    const cardBack = "https://cdn.hearthstonetopdecks.com/wp-content/uploads/2014/06/card-back-default-300x447.png";
    // Select de Imagen
    const showImg = isSelected !== false ? url_image : cardBack
    // Contador
    const [counterVal, setCounterVal] = React.useState(0)

    //OnClick
    const handleClick = () => {
        setCounterVal(counterVal + 1);
    }
    //Nombre del Pokemon
    const [namePoke, setNamePoke] = React.useState("")
    // Mostrar pokemon y Temporizador
    React.useEffect(() => {
        if(counterVal === 1 && isSelected !== true) {
            setSelected(true)
            setNamePoke(name);
            setTimeout(() => {
                setCounterVal(0)
                setSelected(false)
                setNamePoke("");
            }, 4000);                    
        }
      }, [counterVal > 0]);

      
    return (
        <div className={`card ${isSelected ? "selected": ""}`} 
            onClick={handleClick} 
            onSubmit={onSubmit(namePoke)}
            >
                <img 
                src={showImg} 
                alt={name} 
                />
        </div>
    )
}
